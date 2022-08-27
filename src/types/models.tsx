// graphql instances
export interface MediaCoverImage {
  extraLarge: string
}

export interface MediaTitle {
  romaji: string
}

export interface Media {
  id: number
  idMal: number
  coverImage: MediaCoverImage
  bannerImage: string
  title: MediaTitle
  description: string
  episodes: number
  genres: string[]
}

export interface MediaQueryData {
  Media: Media
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

// collections
export interface MediaCollection {
  [idMal: string]: Media
}

export interface Collections {
  [collectionName: string]: MediaCollection
}
