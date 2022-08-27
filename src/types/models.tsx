export interface MediaCoverImage {
  extraLarge: string
}

export interface MediaTitle {
  romaji: string
}

export interface Media {
  coverImage: MediaCoverImage
  title: MediaTitle
}

export interface PageInfo {
  currentPage: number
  hasNextPage: boolean
  lastPage: number
  perPage: number
  total: number
}

export interface Page {
  pageInfo: PageInfo
  media?: Media[]
}

export interface PageQueryData {
  Page: Page
}
