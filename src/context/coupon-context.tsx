// 'use client'
// import { CouponCheckRequestType } from '@/schemaValidations/coupon.schema'
// import discountApiRequest from '@/services/apiInvoice'
// // context/CouponContext.tsx
// import { toast } from 'sonner'

// import React, { createContext, useContext, useEffect, useState } from 'react'

// interface CouponContextType {
//   discount: number
//   finalPrice: number
//   codeCoupon: string
//   loading: boolean

//   setCouponData: (
//     discountAmount: number,
//     finalPrice: number,
//     codeCoupon: string
//   ) => void
//   checkCoupon: (code: string, total: number) => Promise<boolean>
//   clearCoupon: () => void
// }

// const CouponContext = createContext<CouponContextType | undefined>(undefined)

// interface CouponProviderProps {
//   children: React.ReactNode
// }

// export const CouponProvider: React.FC<CouponProviderProps> = ({ children }) => {
//   const [discount, setDiscount] = useState(0)
//   const [finalPrice, setFinalPrice] = useState(0)
//   const [codeCoupon, setCodeCoupon] = useState('')
//   const [loading, setLoading] = useState(false)

//   // Lấy dữ liệu từ localStorage khi component mount
//   useEffect(() => {
//     const storedCoupon = localStorage.getItem('couponData')
//     if (storedCoupon) {
//       const { discountAmount, finalPrice, codeCoupon } =
//         JSON.parse(storedCoupon)
//       setDiscount(discountAmount)
//       setFinalPrice(finalPrice)
//       setCodeCoupon(codeCoupon)
//     }
//   }, [])

//   const setCouponData = (
//     discountAmount: number,
//     finalPrice: number,
//     codeCoupon: string
//   ) => {
//     setDiscount(discountAmount)
//     setFinalPrice(finalPrice)
//     setCodeCoupon(codeCoupon)

//     // Lưu vào localStorage
//     localStorage.setItem(
//       'couponData',
//       JSON.stringify({ discountAmount, finalPrice, codeCoupon })
//     )
//   }

//   const checkCoupon = async (code: string, total: number): Promise<boolean> => {
//     const body: CouponCheckRequestType = { code, total }
//     setLoading(true)

//     try {
//       const response = await discountApiRequest.checkCoupon(body)

//       if (response.payload.success) {
//         setCouponData(
//           Number(response.payload.data?.discount_amount),
//           Number(response.payload.data.final_price),
//           response.payload.data.code
//         )
//         toast.success(response.payload.message)
//         return true
//       } else {
//         toast.error(response.payload.message)
//         return false
//       }
//     } catch (err) {
//       toast.error('Có lỗi xảy ra khi kiểm tra mã giảm giá.')
//       clearCoupon()
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Hàm xóa coupon
//   const clearCoupon = () => {
//     setDiscount(0)
//     setFinalPrice(0)
//     setCodeCoupon('')
//     localStorage.removeItem('couponData') // Xóa khỏi localStorage
//   }

//   return (
//     <CouponContext.Provider
//       value={{
//         discount,
//         finalPrice,
//         codeCoupon,
//         setCouponData,
//         checkCoupon,
//         clearCoupon
//       }}>
//       {children}
//     </CouponContext.Provider>
//   )
// }

// // Custom hook to access the Coupon context
// export const useCoupon = () => {
//   const context = useContext(CouponContext)
//   if (!context) {
//     throw new Error('useCoupon must be used within a CouponProvider')
//   }
//   return context
// }

'use client'
import { CouponCheckRequestType } from '@/schemaValidations/coupon.schema'
import discountApiRequest from '@/services/apiInvoice'
import { toast } from 'sonner'
import React, { createContext, useContext, useState } from 'react'

interface CouponContextType {
  codeCoupon: string
  reachedPrice: number
  discount: number
  loading: boolean
  checkCoupon: (code: string, total: number) => Promise<boolean>
  clearCoupon: () => void
}

const CouponContext = createContext<CouponContextType | undefined>(undefined)

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [codeCoupon, setCodeCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [reachedPrice, setReachedPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  const checkCoupon = async (code: string, total: number): Promise<boolean> => {
    setLoading(true)
    try {
      const body: CouponCheckRequestType = { code, total }
      const response = await discountApiRequest.checkCoupon(body)

      if (response.payload.success) {
        const discountAmount = Number(
          response.payload.data?.discount_amount || 0
        )

        // console.log('response.payload', response.payload)
        setCodeCoupon(response.payload.data.code)

        setDiscount(discountAmount)
        setReachedPrice(response.payload.data.reached_price)
        toast.success(response.payload.message)
        return true
      } else {
        toast.error(response.payload.message)
        clearCoupon()
        return false
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra khi kiểm tra mã giảm giá.')
      clearCoupon()
      return false
    } finally {
      setLoading(false)
    }
  }

  const clearCoupon = () => {
    setCodeCoupon('')
    setDiscount(0)
  }

  return (
    <CouponContext.Provider
      value={{
        codeCoupon,
        reachedPrice,
        discount,
        loading,
        checkCoupon,
        clearCoupon
      }}>
      {children}
    </CouponContext.Provider>
  )
}

export const useCoupon = () => {
  const context = useContext(CouponContext)
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider')
  }
  return context
}
