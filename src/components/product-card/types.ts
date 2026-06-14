export interface StarItem {
  filled: boolean
  half?: boolean
}

export interface ProductItem {
  id: number
  name?: string
  image?: string
  price?: number
  sales?: string
  matchScore?: string
  starColorClass?: string
  stars?: StarItem[]
  suitable?: boolean
}
