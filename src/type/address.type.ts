import type { UUID } from "crypto"

export type Address = {
  id: UUID
  user_id: UUID
  name: string
  country: number
  city: number
  detail_address: string
  postal_code: string
  created_at: string
  updated_at?: string | null
}

export type AddressPayload = {
  name: string
  country: number
  city: number
  postal_code: string
  detail_address: string
}
