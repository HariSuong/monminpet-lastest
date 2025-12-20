'use client'

import { useCoupon } from '@/context/coupon-context'
import { generateCartItemId } from '@/lib/helper'
import { CartAttributeOption, CartContextType, CartItem } from '@/types/cart'
import { Attribute } from '@/types/products'
import { createContext, useContext, useEffect, useState } from 'react'

// Tạo context cho giỏ hàng
const CartContext = createContext<CartContextType | undefined>(undefined)

// Hàm tính toán giá của các thuộc tính đã chọn
export const calculateAttributesPrice = (attributes: CartAttributeOption[]) => {
  if (!Array.isArray(attributes)) return 0 // Nếu không phải mảng, trả về 0
  return attributes.reduce((sum, attr) => sum + attr.price, 0)
}

// CartProvider: Provider để cung cấp dữ liệu giỏ hàng cho các component khác
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartLoaded, setIsCartLoaded] = useState(false)

  // Khi component được mount, kiểm tra xem có dữ liệu giỏ hàng trong localStorage không
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
    setIsCartLoaded(true) // 👈 đảm bảo chỉ sau khi load mới cập nhật localStorage
  }, [])

  // Khi component được mount, kiểm tra xem có dữ liệu giỏ hàng trong localStorage không
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart)) // Nếu có, lấy dữ liệu và đặt vào state
    }
  }, [])

  // Khi state cart thay đổi, lưu giỏ hàng vào localStorage
  useEffect(() => {
    if (!isCartLoaded) return // 👈 chặn lần đầu tiên

    console.log('carrt ussecontext', cart)
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [isCartLoaded, cart])

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (
    item: CartItem,
    defaultImage: string,
    productAttributes: Attribute[]
  ) => {
    console.log('item', item)

    setCart(prev => {
      const formattedAttributes: CartAttributeOption[] = Array.isArray(
        item.attributes
      )
        ? item.attributes
        : Object.values(item.attributes ?? {}) // Chuyển object thành array nếu cần

      // 🛠 Fix: Đảm bảo `id` luôn là string hợp lệ
      // const cartItemId = generateCartItemId(formattedAttributes, item.id) || `temp_${Date.now()}`
      // // Giữ lại ID hiện tại của sản phẩm thay vì tạo ID mới
      // const cartItemId = item.id // Sử dụng ID hiện tại

      console.log('prev', prev)
      // console.log('cartItemId user Cart', cartItemId)

      // Kiểm tra nếu sản phẩm đã có trong giỏ hàng với thuộc tính giống nhau
      const existingItem = prev.find(
        i =>
          i.id === item.id &&
          JSON.stringify(i.attributes) === JSON.stringify(formattedAttributes)
      )

      // Xác định hình ảnh cần lưu (sửa lỗi lấy từ `formattedAttributes` thay vì `item.attributes`)
      const selectedAttributeImage = formattedAttributes.find(
        attr => attr.image
      )?.image
      const finalImage = selectedAttributeImage || defaultImage // Dùng ảnh thuộc tính nếu có, ngược lại dùng ảnh mặc định

      // Nếu sản phẩm đã có và thuộc tính giống nhau
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id &&
          JSON.stringify(i.attributes) === JSON.stringify(formattedAttributes)
            ? {
                ...i,
                quantity: i.quantity + item.quantity, // Cộng dồn số lượng
                total: i.total + item.total // Cộng dồn giá trị tổng
              }
            : i
        )
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng
        return [
          ...prev,
          {
            ...item,
            id: item.id, // Gán ID mới vào sản phẩm trong giỏ hàng
            image: finalImage, // Lưu hình ảnh vào giỏ hàng
            attributes: formattedAttributes, // 🔥 Sửa: Đảm bảo lưu `attributes` dưới dạng array
            total:
              (item.price + calculateAttributesPrice(formattedAttributes)) *
              item.quantity, // Tính tổng giá trị của sản phẩm

            availableAttributes: productAttributes // Lưu attributes vào localStorage
          }
        ]
      }
    })
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id)) // Lọc và loại bỏ sản phẩm có id tương ứng
  }

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) quantity = 1 // Nếu số lượng nhỏ hơn hoặc bằng 0, đặt về 1

    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity, // Cập nhật số lượng mới
              total:
                (item.price + calculateAttributesPrice(item.attributes)) *
                quantity // Cập nhật tổng giá trị
            }
          : item
      )
    )
  }

  // Hàm xử lý thay đổi thuộc tính size trong giỏ hàng
  const handleSizeChange = (item: CartItem, newSize: CartAttributeOption) => {
    const updatedAttributes = item.attributes.map(attr =>
      attr.attribute_id === newSize.attribute_id ? newSize : attr
    )
    console.log('item', item)
    console.log('newSize', newSize)
    // Tạo ID mới cho sản phẩm dựa trên thuộc tính size mới
    const updatedItemId = generateCartItemId(
      updatedAttributes,
      newSize.product_id.toString()
    )

    // Tính lại tổng giá trị của sản phẩm sau khi thay đổi size
    const updatedItem = {
      ...item,
      id: updatedItemId, // Cập nhật lại ID
      attributes: updatedAttributes, // Cập nhật thuộc tính size mới
      total:
        (item.price +
          updatedAttributes.reduce((sum, attr) => sum + attr.price, 0)) *
        item.quantity // Tính lại tổng giá trị
    }

    // Tìm sản phẩm có ID cũ trong giỏ hàng và thay thế nó bằng sản phẩm mới
    setCart(prev => {
      const existingItemIndex = prev.findIndex(i => i.id === item.id)
      if (existingItemIndex !== -1) {
        // Nếu tìm thấy sản phẩm cũ, thay thế nó
        const updatedCart = [...prev]
        updatedCart[existingItemIndex] = updatedItem
        return updatedCart
      } else {
        // Nếu không tìm thấy, thêm sản phẩm mới vào giỏ hàng
        return [...prev, updatedItem]
      }
    })
  }

  /* Hàm lưu thông tin giá trả về sau khi đã gửi đơn hàng và thông báo thành công, dữ liệu trả về sẽ là dạng message: z.string(),
    code_payment: z.string(),
    discount: z.number(),
    total: z.string(),
    fee: z.number(),
    amount: z.number(),
    coupon_message: z.string()
Và giỏ hàng đã được xóa khi thêm thành công. Tôi cần tạo ra một hàm để lưu thông tin này hiển thị ở cột info đơn hàng
    */
  const handlePaymentInfo = (
    codePayment: string,
    amount: number,
    discount: number,
    total: number,
    fee: number,
    couponMessage: string
  ) => {
    // Lưu thông tin thanh toán vào localStorage
    const paymentInfo = {
      codePayment,
      amount,
      discount,
      total,
      fee,
      couponMessage
    }
    localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo))
  }
  // Hàm lấy thông tin thanh toán từ localStorage
  const getPaymentInfo = () => {
    const paymentInfo = localStorage.getItem('paymentInfo')
    if (paymentInfo) {
      return JSON.parse(paymentInfo) // Nếu có, trả về thông tin thanh toán
    }
    return null // Nếu không có, trả về null
  }
  // Hàm xóa thông tin thanh toán khỏi localStorage
  const clearPaymentInfo = () => {
    localStorage.removeItem('paymentInfo') // Xóa thông tin thanh toán khỏi localStorage
  }
  // Hàm xóa sản phẩm khỏi giỏ hàng

  // Hàm xóa tất cả sản phẩm trong giỏ hàng
  const clearCart = () => {
    setCart([]) // Đặt giỏ hàng thành mảng rỗng trong context
    localStorage.removeItem('cart') // Xóa item 'cart' khỏi localStorage
  }

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

  const cartLength = cart.length // Tính tổng số sản phẩm trong giỏ hàng

  return (
    // Cung cấp giá trị giỏ hàng và các hàm cho các component con
    <CartContext.Provider
      value={{
        cart,
        setCart, // ✅ Thêm setCart vào context

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        handleSizeChange,
        isAttributeInCart,
        cartLength,
        handlePaymentInfo,
        getPaymentInfo,
        clearPaymentInfo
      }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook để truy cập giỏ hàng và các hàm xử lý giỏ hàng trong các component
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
