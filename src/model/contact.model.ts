import { randomUUID, type UUID } from "crypto";
import type { Contact, ContactCreate, ContactUpadate } from "../type/contact.type.js";
import { db } from "../config/db.js";

export default class ContactModel {

  static async getContactByID(userID: UUID, contactID: string): Promise<[number, Contact | undefined]> {
    const sql = `
      SELECT id, user_id, first_name, last_name, phone_number, created_at, updated_at
      FROM contacts
      WHERE user_id = $1 AND id = $2 LIMIT 1;
      `;
    const result = await db.query(sql, [userID, contactID]);
    return [result.rowCount!, result.rows[0]];
  }

  static async getContactList(userID: UUID): Promise<Contact[]> {
    const sql = `
        SELECT id, user_id, first_name, last_name, phone_number, created_at, updated_at
        FROM contacts WHERE user_id = $1 GROUP BY id, first_name, last_name ORDER BY first_name, last_name ASC, created_at DESC
      `;
    const result = await db.query(sql, [userID]);
    return result.rows
  }

  static async createContact(contact: ContactCreate, userId: UUID): Promise<Contact> {
    const uuid = randomUUID()
    const sql = `
      INSERT INTO
      contacts (id, user_id, first_name, last_name, phone_number)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING first_name, last_name, phone_number, created_at, updated_at
      `
    const values = [uuid, userId, contact.first_name, contact.last_name, contact.phone_number]
    const result = await db.query(sql, values)

    return result.rows[0]
  }

  static async updateContact(contact: ContactUpadate, userID: string, addressID: string): Promise<Contact> {
    const sql = `
      UPDATE contacts
      SET first_name = $1, last_name = $2, phone_number = $3, updated_at = $4
      WHERE id = $5 AND user_id = $6
      RETURNING id, user_id, first_name, last_name, phone_number, created_at, updated_at
      `;
    const values = [contact.first_name, contact.last_name, contact.phone_number, Date.now(), addressID, userID];
    const result = await db.query(sql, values)

    return result.rows[0]
  }

  static async delete(contactID: string, userID: UUID) {
    const sql = `DELETE FROM contacts WHERE id = $1 AND user_id = $2`;
    const result = await db.query(sql, [contactID, userID])
    return result
  }
}
