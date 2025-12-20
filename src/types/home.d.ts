import { Product } from '@/types/products'

declare global {
  interface MenuItem {
    id: number
    name: string
    thumb: string
    inside: number
  }

  interface Feedback {
    id: number
    avatar: string
    name: string
    content: string
  }

  interface Slide {
    id: number
    image: string
    link: string
    target: '_blank' | '_self' | '_parent' | '_top'
    title: string
    desc: string
  }

  interface ProductHome {
    id: number
    thumb: string
    price: number
    price_old: number
    name: string
    countdown_timer: number
  }

  interface Partner {}

  interface APIHomeResponse {
    success: boolean
    message: string
    data: {
      menu_parents: MenuItem[]
      menu_hot: MenuItem[]
      feedbacks: Feedback[]
      slides: Slide[]
      products: ProductHome[]
      partners: Partner[]
    }
  }

  interface Post {
    id: number
    title: string
    desc: string
    thumb: string
    count_view: number
  }

  interface Service {
    id: number
    title: string
    desc: string
    thumb: string
    count_view: number
  }

  interface SearchResponse {
    success: boolean
    message: string
    data: {
      q?: string
      post: Post[]
      product: Product[]
      service: Service[]
    }
  }
}

export {}
