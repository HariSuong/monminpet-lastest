'use client'
import { Progress } from '@/components/ui/progress'
import { GiftIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ProgressPoint = () => {
  const [progress, setProgress] = useState(4)
  useEffect(() => {
    const timer = setTimeout(() => setProgress(20), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='flex justify-between items-center gap-2 md:w-2/5 w-full'>
      <Progress value={progress} className='w-[100%] bg-[#d1b39b]' />

      <div className='p-1 rounded-full bg-[#d1b39b]'>
        <GiftIcon className='w-6 h-6 text-[#b00303]' />
      </div>
    </div>
  )
}

export default ProgressPoint
