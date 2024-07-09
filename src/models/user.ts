import { IUser } from "../interface/user";

//Array for storing users
const users: IUser[] = [];

//Function to add user
export function createUser(user: IUser) {
  const req_user = {
    ...user,
    id: `${users.length + 1}`,
  };
  users.push(req_user);
}

//function to read user by id
export function getUserById(id: string) {
  return users.find(({ id: userId }) => {
    return userId === id;
  });
}

//function to read user by email
export function getUserByEmail(email: string) {
  return users.find(({ email: userId }) => {
    return userId === email;
  });
}

