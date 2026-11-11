import { type NextFunction, type Response } from "express";
import type { UserRequest } from "../type/user.request.js";
import ContactService from "../services/contact.service.js";

export default class ContactHandler {

  static async getContactList(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const contacts = await ContactService.getContactList(user!);
      res.status(200).json(contacts);
    } catch (err) {
      next(err)
    }
  }

  static async create(req: UserRequest, res: Response, next: NextFunction) {
    const contact = await ContactService.create(req.user!, req.body)
    try {
      res.status(201).json(contact)
    } catch (err) {
      next(err)
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const contact = await ContactService.update(String(id), req.user!, req.body);
      res.status(200).json(contact);
    } catch (err) {
      next(err)
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ContactService.delete(String(id), req.user!)

      res.status(201).json({ message: "contact successfully deleted" })
    } catch (err) {
      next(err)
    }
  }

}
