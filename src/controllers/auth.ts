import { Request, Response } from "express";
import * as AuthService from "../services/auth";

export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.login(body);
  res.json(data);
}

export async function refreshAccessToken(req: Request, res: Response) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json({ message: "No token provided" });
  }
  const data = await AuthService.refreshAccessToken(authorization);
  res.json(data);
}
