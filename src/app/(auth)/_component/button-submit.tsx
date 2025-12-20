import { Button, ButtonProps } from '@/components/ui/button'
import React from 'react'

// Sử dụng ButtonProps để kế thừa các props của Button từ ShadCN UI
interface ButtonSubmitProps extends ButtonProps {
  title: string
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ title, ...props }) => {
  return (
    <div className='w-full text-center mt-4'>
      <Button
        {...props}
        type='submit'
        className='bg-gradient-to-r from-[#000000] via-[#222222] to-[#555555] px-5 md:px-1 md:p-6 py-5 text-center text-xs md:text-lg italic font-semibold uppercase'>
        {title}
      </Button>
    </div>
  )
}

export default ButtonSubmit
