// src/services/apiPosts.js

import http from '@/lib/http'

import {
  CategoryPostRes,
  PostDetailRes,
  PostPaginationRes
} from '@/types/posts'

const postApiRequest = {
  getPostsCat:()=> http.get<CategoryPostRes>('/posts', {
    
    cache: 'no-store'

  }),
  getPosts: (catId: number, page: number, q?: string) =>
    http.get<PostPaginationRes>(
      `/posts/${catId}?page=${page}${q ? `&q=${q}` : ''}`,
      {
        cache: 'no-store'
     
      }
    ),

  getDetail: (id: number) =>
    http.get<PostDetailRes>(`/posts/detail/${id}`, {
      cache: 'no-store'
    })
}

export default postApiRequest
