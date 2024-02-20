import { AccountRepository } from '../persistence/repositories/account-repository'
import { BcryptService } from './bcrypt-service'
import { InvalidCredentialsError } from '../errors/invalid-credentials'
import { EmailAlreadyExistsError } from '../errors/email-already-exists'

const accountRepository = new AccountRepository()
const bcryptService = new BcryptService()

export class AuthService {
  async login(email: string, password: string) {
    const user = await accountRepository.findByEmail(email)
    if (!user) throw new InvalidCredentialsError()
    if (!bcryptService.compare(user.password, password))
      throw new InvalidCredentialsError()
    return { ...user, password: '' }
  }

  async register(email: string, password: string, name: string) {
    if ((await accountRepository.findByEmail(email)) != null)
      throw new EmailAlreadyExistsError()

    const result = await accountRepository.save({
      email,
      password: bcryptService.gen(password),
      name,
    })

    return result
  }
}
