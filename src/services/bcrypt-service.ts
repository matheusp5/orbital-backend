import bcrypt from 'bcrypt'
import { salt } from '../config/bcrypt'

export class BcryptService {
  gen(plain: string) {
    return bcrypt.hashSync(plain, salt)
  }

  compare(hash: string, plain: string) {
    return bcrypt.compareSync(plain, hash)
  }
}
