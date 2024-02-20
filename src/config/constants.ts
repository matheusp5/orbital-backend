import { config } from 'dotenv'
config()

const constants = {
  jwt_secret: process.env.JWT_SECRET as string,
  salt_rounds: Number(process.env.SALT_ROUNDS),
  port: Number(process.env.PORT),
}

export { constants }
