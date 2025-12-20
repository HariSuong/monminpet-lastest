import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const ProductButtonCopy = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  // Hàm xử lý copy mã giảm giá
  const handleCopy = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset sao chép sau 2 giây
  }
  return (
    <Button
      variant='outline'
      onClick={() => handleCopy(code)}
      className={`px-4 py-2 ${
        copied ? 'bg-green-300' : 'bg-blue-300'
      } text-white rounded-md`}>
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}

export default ProductButtonCopy
