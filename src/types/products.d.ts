export interface Product {
  id: number
  name: string
  desc?: string | undefined
  hot?: number
  thumb: string
  price: number
  price_old: number
  video: string
  type_thumb_video: string
  discount?: number
}

export interface Menu {
  id: number
  name: string
  thumb: string
  desc?: string
  video?: string
  type_thumb_video: string
}
export interface ProductPagination {
  current_page: number
  data: Product[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: { url: string; label: string; active: boolean }[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
  total: number
}

export interface ProductPaginationRes {
  success: boolean
  message: string
  menu: Menu | null
  data: ProductPagination
}

export interface ProductItemProps {
  id: number
  name: string
  description: string
  price: string
  imageUrl: string
  isNew?: boolean
  isHot?: boolean
}

export interface ProductListProps {
  products: Product[]
}

export interface FAQ {
  id: number
  answer: string
  question: string
}

export interface Attribute {
  id: number
  name: string
  product_attribute: {
    id: number
    product_id: number
    attribute_id: number
    name: string
    price: number
    image: string
  }[]
}

interface Review {
  name: string
  rating: number
  content: string | null
  created_at: string
}

export interface Coupon {
  code: string
  exp_time: string
  text: string
}

export interface Post {
  id: number
  title: string
  desc: string
  thumb: string
  count_view: number
}

/**{
    "id": 35,
    "name": "Bột sữa dê Fera Pets Skin & Coat giúp lông bóng dày chắc khỏe cho chó mèo, thú cưng 180g",
    "thumb": "https://cdn.monminpet.com/storage/app/public/images/products/2025/04/05/thumb-1743825528360990.png",
    "hot": 0,
    "desc": "Fera Pets Organics cung cấp Bột sữa dê cho da & lông cho chó và mèo 180g, giúp tăng cường sức khỏe da và lông của thú cưng.",
    "price": 990000,
    "price_old": 0,
    "video": null,
    "type_thumb_video": "thumb"
} */

export interface ProductRelated {
  id: number
  name: string
  thumb: string
  hot: number
  desc: string
  price: number
  price_old: number
  video: string
  type_thumb_video: string
}

export interface ProductDetail {
  id: string
  name: string
  thumb: string
  posts: Post[]
  related: ProductRelated[]
  bestseller: number
  desc: string | null
  hot?: number
  imgs?: string[]
  content?: string
  video?: string
  type_thumb_video?: string
  tags?: string[]
  menus?: Menu
  faqs?: FAQ[]
  price?: number
  price_old?: number
  price_text?: string
  price_old_text?: string
  suggests?: Product[]
  attributes?: Attribute[]
  related?: Product[]
  reviews?: Review[]
  coupons?: Coupon[]
}
export interface ProductPoint {
  id: string
  classify: string
  name: string
  thumb: string
  desc: string | null
  imgs?: string[]
  lock?: number
  point_change?: number
  price?: number
  price_old?: number
  attributes?: Attribute[]
}

export interface ProductDetailRes {
  success: boolean
  message: string
  data: ProductDetail
}
export interface CouponRes {
  success: boolean
  message: string
  data: Coupon[]
}
