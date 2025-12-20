import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ButtonService from '@/components/common/button-service'
import { NewPost, PostItemProps } from '@/types/posts'
import Link from 'next/link'
import slugify from 'slugify'

const HotPost = ({ newPost }: { newPost: NewPost }) => {
  return (
    <div className='flex flex-col md:flex-row overflow-hidden md:h-80 md:mb-12 mb-8 gap-4'>
      {/* Hình ảnh */}
      <Link
        href={`/posts/${slugify(newPost.title || '', {
          lower: true,
          strict: true,
          locale: 'vi'
        })}/${newPost.id}`}
        className='w-full md:w-1/2 relative px-10 md:px-0'>
        <Image
          src={newPost.thumb} // Cập nhật đường dẫn ảnh
          alt={newPost.title}
          width={500}
          height={300}
          className='w-full h-full object-cover rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105'
        />
      </Link>

      {/* Nội dung */}
      <div className='w-full md:w-1/2 p-6 flex flex-col justify-center items-start'>
        <Link
          href={`/posts/${slugify(newPost.title || '', {
            lower: true,
            strict: true,
            locale: 'vi'
          })}/${newPost.id}`}>
          <h4 className='text-sm font-medium text-gray-500'>
            THƯỜNG THỨC{newPost.menus}
          </h4>
        </Link>
        <Link
          href={`/posts/${slugify(newPost.title || '', {
            lower: true,
            strict: true,
            locale: 'vi'
          })}/${newPost.id}`}>
          <h2 className='text-2xl font-bold text-gray-900 mt-2'>
            {newPost.title}
          </h2>
        </Link>
        <p className='text-gray-700 mt-4'>{newPost.desc}</p>
        {/* <Button className='mt-4 bg-[#f5e8d7] text-black font-semibold px-6 py-3 rounded-md'>
          <span className='italic font-bold'>ĐỌC THÊM</span>
        </Button> */}
        <div className='mt-4'>
          <ButtonService
            title='ĐỌC THÊM'
            linkUrl={`/posts/${slugify(newPost.title || '', {
              lower: true,
              strict: true,
              locale: 'vi'
            })}/${newPost.id}`}
          />
        </div>
      </div>
    </div>
  )
}

export default HotPost
