export interface Pizzeria {
  id: string
  name: string
  location: string
  created_at: string
  logo_url?: string
  description?: string
  contact_email?: string
}

export interface Challenge {
  id: string
  pizzeria_id: string
  title: string
  reward: string
  created_at: string
  description?: string
  expires_at?: string
  status?: 'active' | 'expired' | 'completed'
  pizzeria?: Pizzeria
}

export interface CreateChallengeInput {
  pizzeria_id: string
  title: string
  reward: string
  description?: string
  expires_at?: string
}
