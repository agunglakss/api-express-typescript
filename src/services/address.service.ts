import AddressModel from "../model/address.model.js";
import type { Address, AddressPayload } from "../type/address.type.js";
import type { User } from "../type/user.type.js";
import { ErrNotFound, ErrUnprocessableEntity } from "../utlis/const.js";
import { CustError } from "../utlis/errors/cust.errror.js";
import { AddressSchema } from "../utlis/schemas/address.schema.js";
import { validate } from "../utlis/validator/validation.js";

export default class AddressService {

  static async getAddressList(user: User): Promise<Address[]> {
    const addresses = await AddressModel.getAddressList(user.id);

    return addresses.map(address => ({
      ...address,
      created_at: address.created_at.toLocaleString(),
      updated_at: address.updated_at?.toLocaleString() ?? null,
    }));
  }

  static async create(user: User, req: AddressPayload): Promise<Address> {
    const result = validate(req, AddressSchema)
    if (!result.isValid) throw new CustError(ErrUnprocessableEntity, 422, result.errors);

    const address = await AddressModel.create(user.id, req)
    return {
      ...address,
      created_at: address.created_at.toLocaleString(),
      updated_at: address.updated_at?.toLocaleString() ?? null
    }
  }

  static async update(addressID: string, user: User, req: AddressPayload): Promise<Address> {
    const result = validate(req, AddressSchema)
    if (!result.isValid) throw new CustError(ErrUnprocessableEntity, 422, result.errors);

    const [rowCount, _] = await AddressModel.getAdressByID(addressID, user.id);
    if (rowCount === 0) throw new CustError(ErrNotFound, 404)

    const address = await AddressModel.update(addressID, user.id, req)
    return {
      ...address,
      created_at: address.created_at?.toLocaleString(),
      updated_at: address.updated_at?.toLocaleString() ?? null,
    }
  }

  static async delete(addressID: string, user: User): Promise<void> {
    const [rowCount, _] = await AddressModel.getAdressByID(addressID, user.id);
    if (rowCount === 0) throw new CustError(ErrNotFound, 404)

    await AddressModel.delete(addressID, user.id)
  }
}
