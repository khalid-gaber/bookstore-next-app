export type post = {
    id?: number,
    title: string,
    body: string,
    image: string,
    name: string,
    profile_image: string
  }

export type book = {
  _id?: number,
  title: string,
  price: number,
  image: string
}

export type meta = {
  current_page: number,
  limit: number,
  isMore: boolean
}

export type User = {
  _id: string,
  username: string
}
