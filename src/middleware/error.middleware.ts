import type { NextFunction, Request, Response } from "express";
import { CustError } from "../utlis/errors/cust.errror.js";
import { randomUUID } from "crypto";

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  const id = randomUUID()
  if (err instanceof CustError) {
    statusCode = err.httpCode;
  }

  res.status(statusCode).json({ trace_id: id, message: err.message, error: err.cause });
}

export default errorMiddleware;
