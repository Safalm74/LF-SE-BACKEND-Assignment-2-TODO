import { Request,Response } from "express"
import * as UserService from "../services/user"
import { IUser } from "../interface/user";
export function getUser (req:Request,res:Response){
        res.json(
            {
                msg:"next"
            }
        )
    }

export function getUserById (req:Request,res:Response){//,isValidToken:Pick<IUser, 'id' | 'name' | 'email'>
    // if (isValidToken){
    //     console.log("logged by: ", isValidToken.email)
    // }
    console.log()
    const {id} =req.params;
    const data=UserService.getUserById(id);
    res.json( data)
}

export function createUser (req:Request,res:Response){
    const {body}=req;
    UserService.createUser(body);
    res.json(body);
}