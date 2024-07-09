
import * as UserModel from "../models/user";
import { IUser } from "../interface/user";
import bcrypt from 'bcrypt';

export function getUserById(id:string){
    const data=UserModel.getUserById(id);
    if (!data){
        return {
            error: 'user not found'
        };
    }
    return {
        message:`username: ${data}`,
    };
}

export function getUserByEmail(email:string){
    const data=UserModel.getUserByEmail(email);
    return data;
}
export async function createUser(user:IUser){
    const password=await bcrypt.hash(user.password,10)
    UserModel.createUser(
        {
            ...user,
            password
        }
    )
    return UserModel.createUser(user);
}