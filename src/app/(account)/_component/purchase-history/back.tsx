'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

const BackLink = () => {
  const router = useRouter()

  return (
    <div
      className='md:w-4/5 w-full flex items-center justify-end cursor-pointer mb-4'
      onClick={() => router.back()}>
      <span className='font-bold'>
        <ChevronLeft className='md:w-12 w-6 md:h-12 h-6' />
      </span>
      <p className='font-bold'>Trở về</p>
    </div>
  )
}

export default BackLink
