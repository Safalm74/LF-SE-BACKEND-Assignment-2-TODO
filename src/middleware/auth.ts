import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { IUser } from "../interface/user";
export function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Error("Un-Aunthenticated"));
  }

  const token = authorization?.split(" ");

  if (token?.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Un-Aunthenticated"));
    return;
  }

  const isValidToken: Pick<IUser, "id" | "email" | "name"> = verify(
    token[1],
    config.jwt.jwt_secret!
  ) as {
    id: string;
    email: string;
    name: string;
  };
  if (!isValidToken) {
    next(new Error("Un-Aunthenticated"));
  }
  next();
}
