import http from '@/lib/http'

const homeApiRequest = {
  getHome: http.get<APIHomeResponse>('/home', {
    cache: 'no-store'
  }),

  getSearch: (query: string) => http.get<SearchResponse>(`search?q=${query}`)
}

export default homeApiRequest
