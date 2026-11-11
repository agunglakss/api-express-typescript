import crypto from "crypto";
import { CustError } from "./errors/cust.errror.js";
import { ErrInternalServerError } from "./const.js";

export class Password {
  static async hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString("hex")

      crypto.scrypt(password, salt, 32, (err, derivedKey) => {
        if (err) {
          return reject(new CustError(ErrInternalServerError, 500));
        }

        resolve(salt + ":" + derivedKey.toString('hex'))
      });
    })
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":");
      if (!salt || !key) {
        return resolve(false);
      }

      crypto.scrypt(password, salt, 32, (err, derivedKey) => {
        if (err) return reject(false);

        const hashKeyBuffer = Buffer.from(key, 'hex');
        console.log(hashKeyBuffer.length !== derivedKey.length)
        if (hashKeyBuffer.length !== derivedKey.length) {
          return resolve(false);
        }

        resolve(crypto.timingSafeEqual(hashKeyBuffer, derivedKey));
      });
    })
  }
}
