'use client'

import { Checkbox } from '@/components/ui/checkbox'

export function CheckboxProfile() {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox id='set-default' />
      <label
        htmlFor='set-default'
        className='text-sm font-light leading-none italic uppercase'>
        CÀI LÀM ĐỊA CHỈ MẶC ĐỊNH
      </label>
    </div>
  )
}
