import config from "../config";
import { IUser } from "../interface/user";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

//service function to login:
//returns new access and refresh token
export async function login(body: Pick<IUser, "email" | "password">) {
  //getting existing user
  const existingUser = getUserByEmail(body.email);

  //checking if user exists
  if (!existingUser) {
    return {
      error: "Invalid email or password",
    };
  }

  //comparing hashed password with incomming password
  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  //checking if password entered is correct
  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
    };
  }

  //creating payload to generate tokens
  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  //generating access token using config jwt secret
  const accessToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiryS,
  });

  //generating refresh token using config jwt secret
  const refreshToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.refrehTokenExpiryS,
  });

  //returning access and refresh token
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}

//service function to generate new access token from valid refresh token
export async function refreshAccessToken(RefreshToken: string) {
  //refresh token is already ensured not to be empty in controller
  const token = RefreshToken.split(" ");

  /*
    the incoming token must have format of:
      "Bearer <token>"
    to ensure this, 
    refresh token is splitted by (" ")
    then checked if token[0]==="Bearer"
    and splitted token is of length 2
  */
  if (token?.length !== 2 || token[0] !== "Bearer") {
    return { error: "Un-Aunthenticated" };
  }

  //to prevent server from crashing from JWT token expire
  try {
    //JWT verify verifies the token and returns decoded token  if verified
    const isValidToken = verify(token[1], config.jwt.jwt_secret!) as Pick<
      IUser,
      "id" | "email" | "name"
    >;

    if (!isValidToken) {
      return { error: "Un-Aunthenticated" };
    }

    //creating payload to generate new access token
    const payload = {
      id: isValidToken.id,
      name: isValidToken.name,
      email: isValidToken.email,
    };

    //generating access token using config jwt secret
    const accessToken = await sign(payload, config.jwt.jwt_secret!, {
      expiresIn: config.jwt.accessTokenExpiryS,
    });
    
    //returning access token
    return { accessToken: accessToken };
  } catch (error) {
    //return the error to controller
    return error;
  }
}
