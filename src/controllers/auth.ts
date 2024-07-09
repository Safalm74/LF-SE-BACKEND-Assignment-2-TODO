import { Request, Response } from "express";
import * as AuthService from "../services/auth";

export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.login(body);
  res.json(data);
}

export async function refreshAccessToken(req: Request, res: Response) {
    const { headers } = req;
    if (!headers.authorization) {
        return (new Error("Un-Aunthenticated"));
      }
    console.log("in controller: ",headers.authorization);
  const data = await AuthService.refreshAccessToken(headers.authorization!);
  res.json(data);
}
