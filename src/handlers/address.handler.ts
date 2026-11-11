import type { NextFunction, Response } from "express";
import type { UserRequest } from "../type/user.request.js";
import type { AddressPayload } from "../type/address.type.js";
import AddressService from "../services/address.service.js";

export default class AddressHandler {

  static async getAdrressList(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await AddressService.getAddressList(req.user!)
      res.status(200).json({ message: "success", data: result })
    } catch (err) {
      next(err)
    }
  }

  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const result = await AddressService.create(req.user!, req.body as AddressPayload)
      res.status(201).json({ message: "success created", data: result });
    } catch (err) {
      next(err)
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await AddressService.update(String(id), req.user!, req.body as AddressPayload)
      res.status(200).json({ message: "success updated", data: result });
    } catch (err) {
      next(err)
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await AddressService.delete(String(id), req.user!)

      res.status(200).json({ message: "success deleted" })
    } catch (err) {
      next(err)
    }
  }
}
