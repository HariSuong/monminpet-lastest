'use client'

import { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import homeApiRequest from '@/services/apiHome'
import ProductItem from '@/components/product/product-item'
import Link from 'next/link'
import slugify from 'slugify'

const SearchModal = () => {
  const [query, setQuery] = useState<string>('')
  const [submittedQuery, setSubmittedQuery] = useState<string>('') // Đã thực sự gửi

  const [results, setResults] = useState<SearchResponse['data']>({
    post: [],
    product: [],
    service: []
  })
  const [isOpen, setIsOpen] = useState<boolean>(false) // Trạng thái mở modal
  const [isLoading, setIsLoading] = useState<boolean>(false) // Trạng thái loading
  const router = useRouter()

  const handleSearch = useCallback(async (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim()
    setSubmittedQuery(trimmedQuery) // Ghi nhận là đã gửi tìm kiếm

    if (!trimmedQuery) {
      setResults({ post: [], product: [], service: [] })
      return
    }
    setIsLoading(true) // Bắt đầu loading

    try {
      // Gọi API tìm kiếm
      const search = await homeApiRequest.getSearch(trimmedQuery)
      if (search) {
        setResults(search?.payload.data)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false) // Kết thúc loading
    }
  }, [])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, handleSearch])

  // ✅ Reset dữ liệu khi modal đóng
  const handleModalStateChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setQuery('')
      setResults({ post: [], product: [], service: [] })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModalStateChange}>
      {/* Nút mở tìm kiếm */}
      <DialogTrigger>
        <Image
          src='/icon/search.png'
          alt='Search'
          width={24}
          height={24}

          // className='w-12 md:w-auto'
        />
      </DialogTrigger>

      {/* Nội dung modal */}
      <DialogContent className='max-h-[80vh] overflow-auto top-[50%] -translate-y-[50%] lg:max-w-xl'>
        <div className='p-4'>
          <h2 className='text-lg font-bold mb-2'>Tìm kiếm</h2>
          <div className='flex gap-2'>
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='Nhập từ khóa...'
              onKeyDown={e => e.key === 'Enter' && handleSearch(query)}
            />
            {/* <Button onClick={handleSearch}>Tìm</Button> */}
          </div>

          {/* Kết quả tìm kiếm */}
          {submittedQuery ? (
            isLoading ? (
              <div className='flex justify-center items-center h-32'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
              </div>
            ) : (
              <div className='mt-4'>
                {/* Sản phẩm */}
                {results.product.length > 0 && (
                  <div className='mb-4 border-b'>
                    <h3 className='text-lg font-semibold'>Sản phẩm</h3>
                    <ul>
                      {results.product.slice(0, 8).map(product => (
                        <Link
                          href={`/products/${slugify(product.name || '', {
                            lower: true,
                            strict: true,
                            locale: 'vi'
                          })}/${product.id}`}
                          key={product.id}
                          onClick={() => handleModalStateChange(false)}>
                          <li className='flex items-center gap-2 p-2'>
                            <div className='w-1/3 md:w-auto'>
                              <Image
                                src={product.thumb}
                                alt={product.name}
                                width={50}
                                height={50}
                                className='rounded w-28 h-28 object-cover'
                              />
                            </div>
                            <div className='w-2/3'>
                              <p className='text-base font-medium uppercase text-gray-800 line-clamp-2'>
                                {product.name}
                              </p>
                              <p className='text-gray-800 font-bold'>
                                {product.price?.toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                })}
                              </p>
                            </div>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bài viết */}
                {results.post.length > 0 && (
                  <div className='mb-4 border-b'>
                    <h3 className='text-lg font-semibold'>Bài viết</h3>
                    <ul>
                      {results.post.slice(0, 4).map(post => (
                        <Link
                          href={`/posts/${slugify(post.title || '', {
                            lower: true,
                            strict: true,
                            locale: 'vi'
                          })}/${post.id}`}
                          key={post.id}
                          onClick={() => handleModalStateChange(false)}>
                          <li className='flex items-center gap-2 p-2'>
                            <div className='w-1/3 md:w-auto'>
                              <Image
                                src={post.thumb}
                                alt={post.title}
                                width={50}
                                height={50}
                                className='rounded w-28 h-28 object-cover'
                              />
                            </div>
                            <p className='w-2/3'>{post.title}</p>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Không có kết quả */}
                {results.product.length === 0 &&
                  results.post.length === 0 &&
                  results.service.length === 0 && (
                    <p className='text-gray-500'>Không có kết quả tìm kiếm</p>
                  )}
              </div>
            )
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
