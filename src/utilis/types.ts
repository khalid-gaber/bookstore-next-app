export type post = {
  _id: string,
  user: User,
  content: string,
  image: string | null,
  comments?: comment[],
  commentsNumber: number,
  likesNumber: number,
  dislikesNumber: number,
  isLiked: boolean,
  isDisliked: boolean,
  createdAt: string,
  updatedAt: string
}

export type comment = {
  _id: string,
  user: User,
  post: string,
  content: string,
  isCommented: boolean,
  createdAt: string,
  updatedAt: string
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
  username: string,
  email: string,
  phone: string,
  country: string,
  gender: 'male' | 'female',
  birthDate: string,
  avatar: string,
}

