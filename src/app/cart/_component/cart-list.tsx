'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useCart } from '@/context/CartContext'
import { TrashIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React, { useState } from 'react'

import CartAttributeSelect from '@/app/cart/_component/cart-attr'
import CouponForm from '@/app/cart/_component/coupon-form'

import QuantityInput from '@/app/cart/_component/quantity'
import MobileCartItems from '@/app/cart/_component/cart-mobile'
import { useCoupon } from '@/context/coupon-context'
import Link from 'next/link'
import slugify from 'slugify'
import { OrderSumary } from '@/app/cart/_component/order-sumary'

const CartList: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, handleSizeChange } = useCart()
  const [openDialog, setOpenDialog] = useState(false) // Điều khiển việc mở và đóng popup
  const [itemToDelete, setItemToDelete] = useState<string | null>(null) // Lưu ID sản phẩm muốn xóa

  // console.log('cart', cart)

  if (cart.length <= 0)
    return (
      <div className='mt-4'>
        {' '}
        <p>Chưa có đơn hàng</p>{' '}
        <Link className='underline text-amber-700' href='/products'>
          Tiếp tục mua sắm
        </Link>
      </div>
    )

  const removeItem = (id: string) => {
    console.log('id', id)
    if (id && itemToDelete === id) {
      removeFromCart(id)
      setOpenDialog(false)
    }
  }

  // Kiểm tra xem thuộc tính nào có trong giỏ hàng
  const isAttributeInCart = (
    attributeParentId: number,
    attributeId: number
  ) => {
    console.log('attributeId', attributeId)
    return cart.some(item =>
      item.attributes.some(
        attr =>
          attr.attribute_id === attributeParentId && attr.id === attributeId
      )
    )
  }
  // Lấy tổng giá trị giỏ hàng
  const totalPrice = cart.reduce((acc, item) => acc + item.total, 0)

  return (
    <>
      {/* Cart Items */}
      <div className='lg:col-span-2'>
        <h2 className='text-2xl font-semibold md:border-b border-none pb-4'>
          GIỎ HÀNG CỦA TÔI
        </h2>

        <Table className='mt-6 md:block hidden'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/3'>SẢN PHẨM</TableHead>

              <TableHead className='w-1/6'>THUỘC TÍNH</TableHead>
              <TableHead className='w-1/6'>SỐ LƯỢNG</TableHead>
              <TableHead className='w-1/6 text-right'>ĐƠN GIÁ</TableHead>
              <TableHead className='w-1/12'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map(item => {
              const imageSrc = item.image || '/images/default-product.png'
              const sizeAttribute = item.attributes.find(
                attr => attr.attribute_id === 1
              )
              const tasteAttribute = item.attributes.find(
                attr => attr.attribute_id === 5
              )
              const volumeAttribute = item.attributes.find(
                attr => attr.attribute_id === 6
              )
              const weightAttribute = item.attributes.find(
                attr => attr.attribute_id === 7
              )

              return (
                <TableRow key={item.id}>
                  {/* Cột 1: Sản phẩm */}
                  <TableCell className='flex items-center justify-between gap-2'>
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      width={80}
                      height={80}
                      className='rounded-md'
                    />
                    <div>
                      <Link
                        href={`/products/${slugify(item.name || '', {
                          lower: true,
                          strict: true,
                          locale: 'vi'
                        })}/${
                          item.attributes.length > 0
                            ? item.attributes[0].product_id
                            : item.id
                        }`}>
                        <h3 className='font-bold'>{item.name}</h3>
                      </Link>
                      <p className='text-sm text-gray-600'>
                        {sizeAttribute?.name ||
                          tasteAttribute?.name ||
                          volumeAttribute?.name ||
                          weightAttribute?.name ||
                          'Mặc định'}
                      </p>
                    </div>
                  </TableCell>

                  {/* Cột 2: Size (Dropdown) */}
                  <TableCell>
                    {/* Size */}
                    {item.attributes.some(attr => attr.attribute_id === 1) && (
                      <CartAttributeSelect
                        key={1}
                        item={item}
                        attributeId={1}
                        attributeName='Size'
                        handleAttributeChange={handleSizeChange}
                        isAttributeInCart={isAttributeInCart}
                      />
                    )}
                    {/* Hương vị */}
                    {item.attributes.some(attr => attr.attribute_id === 5) && (
                      <CartAttributeSelect
                        key={5}
                        item={item}
                        attributeId={5}
                        attributeName='Hương vị'
                        handleAttributeChange={handleSizeChange}
                        isAttributeInCart={isAttributeInCart}
                      />
                    )}
                    {/* Thể tích */}
                    {item.attributes.some(attr => attr.attribute_id === 6) && (
                      <CartAttributeSelect
                        key={6}
                        item={item}
                        attributeId={6}
                        attributeName='Thể tích'
                        handleAttributeChange={handleSizeChange}
                        isAttributeInCart={isAttributeInCart}
                      />
                    )}
                    {/* Khối lượng */}
                    {item.attributes.some(attr => attr.attribute_id === 7) && (
                      <CartAttributeSelect
                        key={7}
                        item={item}
                        attributeId={7}
                        attributeName='Khối lượng'
                        handleAttributeChange={handleSizeChange}
                        isAttributeInCart={isAttributeInCart}
                      />
                    )}
                    {!item.attributes?.length && 'Mặc định'}
                  </TableCell>

                  {/* Cột 3: Số lượng */}
                  <TableCell>
                    <QuantityInput
                      itemId={item.id}
                      value={item.quantity}
                      onIncrease={id => updateQuantity(id, item.quantity + 1)}
                      onDecrease={id =>
                        item.quantity > 1 &&
                        updateQuantity(id, item.quantity - 1)
                      }
                      onChange={(id, newValue) => updateQuantity(id, newValue)}
                      price={item.price}
                    />
                  </TableCell>

                  {/* Cột 4: Đơn giá */}
                  <TableCell className='text-right font-semibold'>
                    {item.total.toLocaleString('vi-VN', {
                      currency: 'VND'
                    })}
                    đ
                  </TableCell>

                  {/* Cột 5: Xóa */}
                  <TableCell className='text-center'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-red-500'
                      onClick={() => {
                        removeItem(item.id)
                        setItemToDelete(item.id)
                        setOpenDialog(true) // Mở popup xác nhận xóa
                      }}>
                      <TrashIcon className='w-5 h-5' />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
            {/* Coupon Form */}
            <CouponForm />
          </TableBody>
        </Table>

        <MobileCartItems />
      </div>

      {/* Order Summary */}
      <OrderSumary />

      {/* Dialog Confirm Delete */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn chắc chắn muốn xóa sản phẩm này?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDialog(false)}>
              Hủy
            </Button>
            <Button
              variant='destructive'
              onClick={() => removeItem(itemToDelete!)}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CartList
