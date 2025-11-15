import { User } from './user'

export interface Roast {
  id: string
  author_id: string | null
  text: string
  created_at: string
  likes: number
  author?: User | null
  parent_roast_id?: string | null
  echo_count?: number
}

export interface CreateRoastInput {
  text: string
  author_id?: string
  parent_roast_id?: string
}

export interface UpdateRoastInput {
  text?: string
  likes?: number
}

export { User }
