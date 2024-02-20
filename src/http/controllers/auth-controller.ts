import { Request, Response } from 'express'
import { AuthService } from '../../services/auth-service'
import { JwtService } from '../../services/jwt-service'
import { EmailAlreadyExistsError } from '../../errors/email-already-exists'
import { InvalidCredentialsError } from '../../errors/invalid-credentials'
import { InvalidJwtError } from '../../errors/invalid-jwt'
import { createResponse } from '../../models/dto/response'
import { InvalidBodyError } from '../../errors/invalid-body'
import { AuthorizationService } from '../../services/authorization-service'
import { Logger } from '../../config/logger'
import { HttpStatusCodes } from '../../models/enums/http-status-codes'

const authService = new AuthService()
const jwtService = new JwtService()
const authorizationService = new AuthorizationService()
const logger = new Logger()

export class AuthController {
  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body
      if (!email || !password) throw new InvalidBodyError()
      const result = await authService.login(email, password)
      return response.json(createResponse(true, jwtService.generate(result.id)))
    } catch (e: any) {
      if (e instanceof InvalidCredentialsError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'invalid_credentials'))
      } else if (e instanceof InvalidBodyError) {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json(createResponse(false, 'invalid_body'))
      }
      logger.error(e.message)
      return response
        .status(HttpStatusCodes.INTERNAL_ERROR)
        .json(createResponse(false, 'internal_error'))
    }
  }

  async register(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body
      if (!email || !password || !name) throw new InvalidBodyError()
      const user = await authService.register(email, password, name)

      return response.json(createResponse(true, { ...user, password: null }))
    } catch (e: any) {
      if (e instanceof EmailAlreadyExistsError) {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json(createResponse(false, 'email_already_exists'))
      } else if (e instanceof InvalidBodyError) {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json(createResponse(false, 'invalid_body'))
      }
      logger.error(e.message)
      return response
        .status(HttpStatusCodes.INTERNAL_ERROR)
        .json(createResponse(false, 'internal_error'))
    }
  }

  async decode(request: Request, response: Response) {
    try {
      const user = await authorizationService.getAuthenticateUserOrThrow(
        request,
      )
      return response.json(createResponse(true, { ...user, password: null }))
    } catch (e: any) {
      if (e instanceof InvalidJwtError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'invalid_jwt'))
      }
      logger.error(e.message)
      return response
        .status(HttpStatusCodes.INTERNAL_ERROR)
        .json(createResponse(false, 'internal_error'))
    }
  }
}
