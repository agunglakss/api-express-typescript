import type { ContactCreate, ContactUpadate } from "../../type/contact.type.js";
import { rules } from "../validator/rules.js";
import type { Schema } from "../validator/types.js";

export const ContactCreateSchema: Schema<ContactCreate> = {
  first_name: [
    rules.required("First name is required"),
    rules.string("First name must be letter"),
    rules.minLength(3),
    rules.maxLength(50),
  ],
  last_name: [
    rules.maxLength(50),
  ],
  phone_number: [
    rules.required("Phone number is required"),
  ],
}

export const ContactUpdateSchema: Schema<ContactUpadate> = {
  first_name: [
    rules.required("First name is required"),
    rules.string("First name must be letter"),
    rules.minLength(3),
    rules.maxLength(50),
  ],
  last_name: [
    rules.string("First name must be letter"),
    rules.maxLength(50),
    rules.minLength(3),
  ],
  phone_number: [
    rules.required("Phone number is required"),
    rules.maxLength(15),
    rules.minLength(8),
  ],
}
