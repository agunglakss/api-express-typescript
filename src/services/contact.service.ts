import ContactModel from "../model/contact.model.js";
import type { ContactCreate, ContactUpadate } from "../type/contact.type.js";
import type { responeSuccess } from "../type/response.success.js";
import type { User } from "../type/user.type.js";
import { ErrNotFound, ErrUnprocessableEntity } from "../utlis/const.js";
import { CustError } from "../utlis/errors/cust.errror.js";
import { ContactCreateSchema, ContactUpdateSchema } from "../utlis/schemas/contact.schema.js";
import { validate } from "../utlis/validator/validation.js";

export default class ContactService {

  static async getContactList(user: User): Promise<responeSuccess> {
    const contacts = await ContactModel.getContactList(user.id)
    const mapContacts = contacts.map(contact => ({
      ...contact,
      created_at: contact.created_at.toLocaleString(),
      updated_at: contact.updated_at?.toLocaleString() ?? null,
    }))

    return {
      message: "success",
      data: mapContacts
    }
  }

  static async create(user: User, req: ContactCreate): Promise<responeSuccess> {
    const result = validate(req, ContactCreateSchema)
    if (!result.isValid) throw new CustError(ErrUnprocessableEntity, 422, result.errors);

    const contact = await ContactModel.createContact(req, user.id)

    return {
      message: "contact has been successfully created",
      data: contact
    }
  }

  static async update(contactID: string, user: User, req: ContactUpadate): Promise<responeSuccess> {
    const result = validate(req, ContactUpdateSchema);
    if (!result.isValid) throw new CustError(ErrUnprocessableEntity, 422, result.errors);

    const [rowCount, _] = await ContactModel.getContactByID(user.id, contactID);
    if (rowCount === 0) throw new CustError(ErrNotFound, 404);

    const contact = await ContactModel.updateContact(req, user.id, contactID);

    return {
      message: "success",
      data: {
        ...contact,
        created_at: contact.created_at?.toLocaleString(),
        updated_at: contact.updated_at?.toLocaleString(),
      }
    }
  }

  static async delete(contactID: string, user: User): Promise<responeSuccess> {
    const [rowCount, _] = await ContactModel.getContactByID(user.id, contactID);
    if (rowCount === 0) throw new CustError(ErrNotFound, 404);

    await ContactModel.delete(contactID, user.id)

    return {
      message: "contact successfully deleted"
    }
  }
}
