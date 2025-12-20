export interface PageInfo {
  current_page: number
  last_page: number
  links: Link[]
}

export interface Link {
  url: string | null
  label: string
  active: boolean
}
