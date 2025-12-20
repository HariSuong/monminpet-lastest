/*
import { PageInfo } from '@/types/pagination'
import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const Pagination: React.FC<{
  pageInfo: PageInfo
  onPageChange: (page: number) => void
}> = ({ pageInfo, onPageChange }) => {
  const { current_page, last_page, links } = pageInfo

  const handlePageChange = (url: string | null) => {
    if (url) {
      const urlParams = new URLSearchParams(url.split('?')[1])
      const page = parseInt(urlParams.get('page') || '1', 10)
      onPageChange(page)
    }
  }

  return (
    <div className='w-full my-8'>
      <ul className='flex space-x-3 justify-center mt-8'>
        <li
          className={`flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded ${
            current_page === 1 ? 'opacity-50 pointer-events-none' : ''
          }`}
          onClick={() => handlePageChange(links[0].url)}>
          <HiChevronLeft className='w-3 fill-gray-500' />
        </li>
        {links.map((link, index) => {
          if (
            link.label === '&laquo; Previous' ||
            link.label === 'Next &raquo;'
          )
            return null
          return (
            <li
              key={index}
              className={`flex items-center justify-center shrink-0 cursor-pointer text-sm font-bold ${
                link.active ? 'bg-[#007bff] text-white' : 'text-[#424040]'
              } w-9 h-8 rounded`}
              onClick={() => handlePageChange(link.url)}>
              {link.label}
            </li>
          )
        })}
        <li
          className={`flex items-center justify-center shrink-0 cursor-pointer bg-gray-300 w-9 h-8 rounded ${
            current_page === last_page ? 'opacity-50 pointer-events-none' : ''
          }`}
          onClick={() => handlePageChange(links[links.length - 1].url)}>
          <HiChevronRight className='w-3 fill-gray-500' />
        </li>
      </ul>
    </div>
  )
}

export default Pagination

*/

'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { PageInfo } from '@/types/pagination'
import { useRouter } from 'next/navigation'

interface PaginationProps {
  pageInfo: PageInfo
  searchParams: { catId?: string; page?: string; orderBy?: string }
}

const PaginationDemo: React.FC<PaginationProps> = ({
  pageInfo,
  searchParams
}) => {
  const { current_page, last_page, links } = pageInfo
  const router = useRouter()

  // Cập nhật URL khi chuyển trang
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())

    router.push(`?${params.toString()}`)
  }

  return (
    <Pagination className='w-full my-8'>
      <PaginationContent>
        <PaginationItem
          className={`${
            current_page === 1
              ? 'opacity-50 pointer-events-none text-lg text-black'
              : ''
          } text-lg text-[#424040] cursor-pointer`}>
          <PaginationPrevious
            onClick={() => handlePageChange(current_page - 1)}
            aria-disabled={current_page === 1}
          />
        </PaginationItem>

        {links.map((link, index) => {
          if (link.label === '&laquo; Trước' || link.label === 'Tiếp &raquo;')
            return null

          return (
            <PaginationItem
              key={index}

              // className={`${
              //   link.active ? 'bg-[#007bff] text-white' : 'text-[#424040]'
              // }`}
            >
              <PaginationLink
                onClick={() => handlePageChange(Number(link.label))}
                className={`${
                  link.active ? 'text-black' : 'text-[#424040]'
                } text-lg cursor-pointer`}
                isActive={link.active}>
                {link.label}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem
          className={`${
            current_page === last_page
              ? 'opacity-50 pointer-events-none text-lg text-black'
              : ''
          } text-lg text-[#424040] cursor-pointer`}>
          <PaginationNext
            onClick={() => handlePageChange(current_page + 1)}
            aria-disabled={current_page === last_page}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationDemo
