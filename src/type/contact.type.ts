import type { UUID } from "crypto"

export type Contact = {
  id: UUID
  first_name: string
  last_name?: string
  phone_number: string
  created_at: Date
  updated_at?: Date
}

export type ContactCreate = {
  first_name: string
  last_name?: string
  phone_number: string
}

export type ContactUpadate = {
  first_name: string
  last_name?: string
  phone_number: string
}
