import { Request, Response } from 'express'
import { createResponse } from '../../models/dto/response'
import { CategoryRepository } from '../../persistence/repositories/category-respository'
import { InvalidBodyError } from '../../errors/invalid-body'
import { InvalidJwtError } from '../../errors/invalid-jwt'
import { UnauthorizedError } from '../../errors/unauthorized'
import { AuthorizationService } from '../../services/authorization-service'
import { InvalidParamError } from '../../errors/invalid-param'
import { Logger } from '../../config/logger'
import { HttpStatusCodes } from '../../models/enums/http-status-codes'

const categoriesRepository = new CategoryRepository()
const authorizationService = new AuthorizationService()
const logger = new Logger()

export class CategoriesController {
  async findAll(request: Request, response: Response) {
    try {
      return response.json(
        createResponse(true, await categoriesRepository.findAll()),
      )
    } catch (e: any) {
      logger.error(e.message)
      return response
        .status(HttpStatusCodes.INTERNAL_ERROR)
        .json(createResponse(false, 'internal_error'))
    }
  }

  async findById(request: Request, response: Response) {
    try {
      const id = request.params.id
      if (!id) throw new InvalidParamError()
      return response.json(
        createResponse(true, await categoriesRepository.findById(id)),
      )
    } catch (e: any) {
      if (e instanceof InvalidParamError) {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json(createResponse(false, 'invalid_param'))
      }
      logger.error(e.message)
      return response
        .status(HttpStatusCodes.INTERNAL_ERROR)
        .json(createResponse(false, 'internal_error'))
    }
  }

  async findBySlug(request: Request, response: Response) {
    try {
      const slug = request.params.slug
      if (!slug) throw new InvalidParamError()
      return response.json(
        createResponse(true, await categoriesRepository.findBySlug(slug)),
      )
    } catch (e: any) {
      if (e instanceof InvalidParamError) {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json(createResponse(false, 'invalid_param'))
      }
      return response
        .status(HttpStatusCodes.INTERNAL_ERROR)
        .json(createResponse(false, 'internal_error'))
    }
  }

  async findByName(request: Request, response: Response) {
    try {
      const name = request.params.name
      if (!name) throw new InvalidParamError()
      return response.json(
        createResponse(true, await categoriesRepository.findByName(name)),
      )
    } catch (e: any) {
      if (e instanceof InvalidParamError) {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json(createResponse(false, 'invalid_param'))
      }
      logger.error(e.message)
      return response
        .status(HttpStatusCodes.INTERNAL_ERROR)
        .json(createResponse(false, 'internal_error'))
    }
  }

  async create(request: Request, response: Response) {
    try {
      const admin = await authorizationService.getAdminUserOrThrow(request)
      const { name, description } = request.body
      if (!name || !description) throw new InvalidBodyError()
      return response.json(
        createResponse(true, await categoriesRepository.save(request.body)),
      )
    } catch (e: any) {
      if (e instanceof UnauthorizedError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'you_dont_have_permissions'))
      } else if (e instanceof InvalidBodyError) {
        return response
          .status(HttpStatusCodes.BAD_REQUEST)
          .json(createResponse(false, 'invalid_body'))
      } else if (e instanceof InvalidJwtError) {
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
