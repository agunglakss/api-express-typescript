import { randomUUID } from "crypto";
import type { Address, AddressPayload } from "../type/address.type.js"
import { db } from "../config/db.js";

export default class AddressModel {
  static async getAddressList(userID: string): Promise<Address[]> {
    const sql = `
        SELECT id, user_id, name, country, city, postal_code, detail_address, created_at, updated_at
        FROM addresses
        WHERE user_id = $1
        GROUP BY id, country, city
        ORDER BY country, city ASC, created_at DESC
      `;
    const result = await db.query(sql, [userID]);

    return result.rows;
  }

  static async getAdressByID(addressID: string, userID: string): Promise<[number, Address]> {
    const sql = `
        SELECT id, user_id, name, country, city, postal_code, detail_address, created_at, updated_at
        FROM addresses
        WHERE id = $1 AND user_id = $2
        LIMIT 1
      `;
    const result = await db.query(sql, [addressID, userID]);

    return [result.rowCount!, result.rows[0]];
  }

  static async create(userID: string, address: AddressPayload): Promise<Address> {
    const uuid = randomUUID();
    const sql = `
        INSERT INTO addresses
        (id, user_id, name, country, city, postal_code, detail_address)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, user_id, name, country, city, postal_code, detail_address, created_at, updated_at
      `;
    const value = [uuid, userID, address.name, address.country, address.city, address.postal_code, address.detail_address];
    const result = await db.query(sql, value);

    return result.rows[0];
  }

  static async update(addressID: string, userID: string, address: AddressPayload): Promise<Address> {
    const sql = `
        UPDATE addresses
        SET name=$1, country=$2, city=$3, postal_code=$4, detail_address=$5, updated_at=$6
        WHERE id=$7 AND user_id=$8
        RETURNING id, user_id, name, country, city, postal_code, detail_address, created_at, updated_at
      `
    const value = [address.name, address.country, address.city, address.postal_code, address.detail_address, Date.now(), addressID, userID];
    const result = await db.query(sql, value);

    return result.rows[0];
  }

  static async delete(addressID: string, userID: string):Promise<number | null> {
    const sql = `DELETE FROM addresses WHERE id=$1 AND user_id=$2`
    const result = await db.query(sql, [addressID, userID])

    return result.rowCount
  }
}
