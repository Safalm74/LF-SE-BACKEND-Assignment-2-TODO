import { IUser } from "../interface/user";

const users: IUser[] = [];
export function getUserById(id: string) {
  return users.find(({ id: userId }) => {
    return userId === id;
  });
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userId }) => {
    return userId === email;
  });
}

export function createUser(user: IUser) {
  const req_user = {
    ...user,
    id: `${users.length + 1}`,
  };
  users.push(req_user);
}
