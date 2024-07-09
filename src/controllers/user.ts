import { Request,Response } from "express"
//importing user service
import * as UserService from "../services/user"

//controller function to get user by id:
export function getUserById (req:Request,res:Response){
    const {id} =req.params;//getting id from request params

    const data=UserService.getUserById(id);
    res.json( data)
}

//controller function to create user:
export function createUser (req:Request,res:Response){
    const {body}=req;//getting new user data from request body

    UserService.createUser(body);
    res.json(body);
}