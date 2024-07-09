//importing user model
import * as UserModel from "../models/user";
//importing user interface
import { IUser } from "../interface/user";
//importing bcrypt to hash password
import bcrypt from "bcrypt";

//service function to return user by id
export function getUserById(id: string) {
  const data = UserModel.getUserById(id);
  if (!data) {
    return {
      error: "user not found",
    };
  }
  return data;
}

//service function to return user by email
export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);
  return data;
}

//service function to create new user
export async function createUser(user: IUser) {
  const password = await bcrypt.hash(user.password, 10);//hashing password
  const newUser = {
    ...user,
    password,
  };

  //creating new user
  return UserModel.createUser(newUser);
}
