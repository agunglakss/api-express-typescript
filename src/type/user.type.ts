import type { UUID } from "crypto"

export type User = {
  id: UUID,
  first_name: string,
  last_name?: string,
  email: string,
  token_expired_at?: Date,
  created_at?: Date,
  updated_at?: Date
}

export type UserCreate = {
  id: UUID,
  first_name: string,
  last_name?: string,
  email: string,
  password: string
}

export type UserLogin = {
  email: string,
  password: string
}

export type UserUpdate = {
  id: UUID
  email?: string
  token?: string
  token_expired_at?: Date
}
