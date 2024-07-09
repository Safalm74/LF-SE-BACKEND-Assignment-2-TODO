import config from "../config";
import { IUser } from "../interface/user";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import { JsonWebTokenError, sign, verify } from "jsonwebtoken";
export async function login(body: Pick<IUser, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  if (!existingUser) {
    return {
      error: "Invalid email or password",
    };
  }
  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );
  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
    };
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const accessToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiryS,
  });

  const refreshToken = await sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.refrehTokenExpiryS,
  });
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
}

export async function refreshAccessToken(RefreshToken: string) {
  try {
    if (!RefreshToken) {
      throw new Error("Un-Aunthenticated");
    }

    const token = RefreshToken.split(" ");

    if (token?.length !== 2 || token[0] !== "Bearer") {
      throw new Error("Un-Aunthenticated");
    }

    const isValidToken: Pick<IUser, "id" | "email" | "name"> = verify(
      token[1],
      config.jwt.jwt_secret!,
      {
        ignoreExpiration: false,
      }
    ) as {
      id: string;
      email: string;
      name: string;
    };

    const payload = {
      id: isValidToken.id,
      name: isValidToken.name,
      email: isValidToken.email,
    };

    const accessToken = await sign(payload, config.jwt.jwt_secret!, {
      expiresIn: config.jwt.accessTokenExpiryS,
    });

    return { accessToken: accessToken };
  } catch (err) {
    return err;
  }
}
