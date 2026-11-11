import type { AddressPayload } from "../../type/address.type.js";
import { rules } from "../validator/rules.js";
import type { Schema } from "../validator/types.js";

export const AddressSchema: Schema<AddressPayload> = {
  name: [
    rules.required("Name is required"),
    rules.string("Name must be letter"),
    rules.minLength(3),
    rules.maxLength(50),
  ],
  country: [
    rules.required("Country is required"),
    rules.string("Country must be letter")
  ],
  city: [
    rules.required("City is required"),
    rules.string("City must be letter")
  ],
  postal_code: [
    rules.required("Postal Code is required"),
    rules.string("Postal Code must be letter")
  ],
  detail_address: [
    rules.required("Detail Address is required"),
    rules.string("Detail Address must be letter")
  ],
}
