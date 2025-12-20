import { Attribute } from '@/types/products'

// Định nghĩa các type đã cho sẵn
export interface CartAttributeOption {
  id: number
  product_id: number
  name: string
  attribute_id: number
  image: string
  price: number
}

export interface CartItem {
  id: string
  image?: string | StaticImport | undefined
  name: string
  price: number
  quantity: number
  attributes: CartAttributeOption[]
  availableAttributes?: Attribute[]
  total: number
  point?: number | undefined
}

export interface CartContextType {
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void // ✅ Thêm setCart vào context
  addToCart: (
    item: CartItem,
    defaultImage: string,
    availableAttributes: Attribute[]
  ) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  handleSizeChange: (item: CartItem, newSize: CartAttributeOption) => void
  clearCart: () => void
  isAttributeInCart: (attributeParentId: number, attributeId: number) => boolean
  handlePaymentInfo: (
    codePayment: string,
    amount: number,
    discount: number,
    total: number,
    fee: number,
    couponMessage: string
  ) => void
  getPaymentInfo: () => {
    codePayment: string
    amount: number
    discount: number
    total: number
    fee: number
    couponMessage: string
  } | null
  clearPaymentInfo: () => void
  cartLength: number
}
