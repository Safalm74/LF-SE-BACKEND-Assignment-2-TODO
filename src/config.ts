import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  database: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PW: process.env.POSTGRES_PW,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    accessTokenExpiryS: 60,
    refrehTokenExpiryS: 300,
  },
};

export default config;
