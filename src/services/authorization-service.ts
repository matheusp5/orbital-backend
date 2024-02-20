import { Request } from 'express'
import { JwtService } from './jwt-service'
import { AccountRepository } from '../persistence/repositories/account-repository'
import { UnauthorizedError } from '../errors/unauthorized'
import { InvalidJwtError } from '../errors/invalid-jwt'
import { Roles } from '../models/enums/roles'

const jwtService = new JwtService()
const accountRepository = new AccountRepository()

export class AuthorizationService {
  async getAuthenticateUser(request: Request) {
    const { authorization } = request.headers
    if (!authorization) return null
    const token = authorization?.replace('Bearer ', '')
    if (!token) throw new InvalidJwtError()
    if (!jwtService.verify(token)) throw new InvalidJwtError()
    const id = jwtService.decode(token)
    const user = await accountRepository.findById(id)
    if (!user) throw new InvalidJwtError()
    return user
  }

  async getAuthenticateUserOrThrow(request: Request) {
    const { authorization } = request.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) throw new InvalidJwtError()
    if (!jwtService.verify(token)) throw new InvalidJwtError()
    const id = jwtService.decode(token)
    const user = await accountRepository.findById(id)
    if (!user) throw new InvalidJwtError()
    return user
  }

  async getAdminUserOrThrow(request: Request) {
    const { authorization } = request.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) throw new InvalidJwtError()
    if (!jwtService.verify(token)) throw new InvalidJwtError()
    const id = jwtService.decode(token)
    const user = await accountRepository.findById(id)
    if (!user) throw new InvalidJwtError()
    if (user.role != Roles.ADMIN) throw new UnauthorizedError()
    return user
  }
}
