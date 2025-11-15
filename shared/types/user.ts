export interface User {
  id: string
  email: string
  name: string
  created_at: string
  avatar_url?: string
  bio?: string
}

export interface UserProfile extends User {
  total_roasts: number
  total_likes: number
  total_echoes: number
  rank?: number
}
