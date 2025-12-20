'use client'
import React from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const BuyAgain = (
  { jsonInvoices }: { jsonInvoices: string } // jsonInvoices là chuỗi JSON chứa thông tin sản phẩm
) => {
  const { clearCart, setCart } = useCart() // Chỉ cần clearCart
  const router = useRouter()
  const handleBuyAgain = (jsonInvoices: string) => {
    console.log('jsonInvoices', jsonInvoices)
    clearCart() // Xóa giỏ hàng hiện tại

    const newCart = JSON.parse(jsonInvoices) // Chuyển JSON thành object
    // Lưu trực tiếp jsonInvoices vào localStorage (giả sử cấu trúc đã phù hợp)
    localStorage.setItem('cart', jsonInvoices)
    setCart(newCart) // ✅ Cập nhật giỏ hàng trong context

    router.push('/cart')
  }
  return (
    <Button
      className='bg-[#b00303] text-white py-2 mt-0 rounded-md hover:bg-red-600 uppercase'
      onClick={() => handleBuyAgain(jsonInvoices)}>
      {/* {product.rating > 0 ? 'Mua lại' : 'Đánh giá'} */}
      Mua lại
    </Button>
  )
}

export default BuyAgain
