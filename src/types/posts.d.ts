import { PostPagination } from './posts'
export interface PostsCat {
  id: number
  name: string
  thumb: string
  video?: string
  type_thumb_video?: string
  content: string
}

export interface PostsListProps {
  postsList: PostsCat[]
}

export interface PostItemProps {
  id: number
  title: string
  desc: string
  thumb: string
  count_view: number
}
export interface CategoryPost {
  id: number
  name: string
  thumb: string
  posts: PostItemProps[]
}

export interface NewPost {
  id: number
  user: null
  thumb: string
  title: string
  desc: string
  content: string
  keywords: string
  created_at: string
  updated_at: string
  show: number
  hot: number
  priority: number
  count_view: number
  translate: null
  video: null
  menus: string
}

export interface CategoryPostRes {
  success: boolean
  message: string
  data: CategoryPost[]
  new_post: NewPost[]
}

export interface PostPagination {
  current_page: number

  data: Post[]
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

export interface PostPaginationRes {
  success: boolean
  message: string
  data: PostPagination
  menu: {
    id: number
    name: string
    desc: string
    thumb: string
  }
}

export interface PostDetail {
  id: number
  title: string
  desc: string
  content: string
  thumb: string
  keywords: string[]
  menus: {
    id: number
    name: string
    desc: string
    thumb: string
  }
  related: PostItemProps[]
  created_at: string
  count_view: number
  hot: number
}

export interface PostDetailRes {
  success: boolean
  message: string
  data: PostDetail
}
