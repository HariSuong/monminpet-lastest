import Image from 'next/image'

// app/loading.tsx
export default function Loading() {
  return (
    <div className='fixed md:top-0 -top-24 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-50'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-700'></div>
      <Image src='/logo/logo.png' width={200} height={200} alt='MonMinPet' />
      <span className='ml-3 text-gray-700'>Đang tải...</span>
    </div>
  )
}
