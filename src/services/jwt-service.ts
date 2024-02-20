import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { jwtBodyFactory, jwtOptions } from '../config/jwt'
import { constants } from '../config/constants'

export class JwtService {
  generate(id: string) {
    return jwt.sign(jwtBodyFactory(id), constants.jwt_secret)
  }

  verify(token: string) {
    try {
      jwt.verify(token, constants.jwt_secret)
      return true
    } catch (e: any) {
      return false
    }
  }

  decode(token: string) {
    const result: any = jwt.decode(token)
    return result.id
  }
}
