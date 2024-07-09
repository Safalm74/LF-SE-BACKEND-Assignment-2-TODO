import { Request, Response } from "express";
//Importing auth services
import * as AuthService from "../services/auth";

//Controller function to login:
/*
  Responds with access token and refresh token if credentials 
  are correct else error is responded
*/
export async function login(req: Request, res: Response) {
  const { body } = req; //extracting body from req for credential
  const data = await AuthService.login(body); 
  res.json(data); 
}

//Controller function that uses refesh token to generate new access token:
/*
  Responds with new access token  if valid refresh token id provided else
  error is responded
*/
export async function refreshAccessToken(req: Request, res: Response) {
  const { authorization } = req.headers; //extracting authorization from request header
  
  //checking if token is provided in authorization
  if (!authorization) {
    return res.json({ message: "No token provided" });
  }
  
  //generating new access token using the refresh token
  const data = await AuthService.refreshAccessToken(authorization); 
  res.json(data);
}
