import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { IUser } from "../interface/user";

//middleware function to auth
export function auth(req: Request, res: Response, next: NextFunction) {
  //extracting authorization from request header
  const { authorization } = req.headers;
  //checking if token is provided in authorization
  if (!authorization) {
    next(new Error("Un-Aunthenticated"));
  }
  /*
    the incoming token must have format of:
      "Bearer <token>"
    to ensure this, 
    refresh token is splitted by (" ")
    then checked if token[0]==="Bearer"
    and splitted token is of length 2
  */
  const token = authorization?.split(" ");
  if (token?.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Un-Aunthenticated"));
    return;
  }
  //JWT verify verifies the token and returns decoded token if verified
  const isValidToken = verify(token[1], config.jwt.jwt_secret!) as Pick<
      IUser,
      "id" | "email" | "name"
    >;

  if (!isValidToken) {
    next(new Error("Un-Aunthenticated"));
  }
  //to next fuction of route
  next();
}
