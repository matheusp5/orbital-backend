import { Request, Response } from 'express'
import { createResponse } from '../../models/dto/response'
import { ProductRepository } from '../../persistence/repositories/product-repository'
import { InvalidBodyError } from '../../errors/invalid-body'
import { InvalidJwtError } from '../../errors/invalid-jwt'
import { UnauthorizedError } from '../../errors/unauthorized'
import { AuthorizationService } from '../../services/authorization-service'
import { InvalidParamError } from '../../errors/invalid-param'
import { Logger } from '../../config/logger'
import { HttpStatusCodes } from '../../models/enums/http-status-codes'

const productsRepository = new ProductRepository()
const authorizationService = new AuthorizationService()
const logger = new Logger()

export class ProductsController {
  async findAll(request: Request, response: Response) {
    try {
      await authorizationService.getAuthenticateUserOrThrow(request)
      return response.json(
        createResponse(true, await productsRepository.findAll()),
      )
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

  async findById(request: Request, response: Response) {
    try {
      await authorizationService.getAuthenticateUserOrThrow(request)
      const id = request.params.id
      if (!id) throw new InvalidParamError()
      return response.json(
        createResponse(true, await productsRepository.findById(id)),
      )
    } catch (e: any) {
      if (e instanceof InvalidJwtError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'invalid_jwt'))
      } else if (e instanceof InvalidParamError) {
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

  async findByName(request: Request, response: Response) {
    try {
      await authorizationService.getAuthenticateUserOrThrow(request)
      const name = request.params.name
      if (!name) throw new InvalidParamError()
      return response.json(
        createResponse(true, await productsRepository.findByName(name)),
      )
    } catch (e: any) {
      if (e instanceof InvalidJwtError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'invalid_jwt'))
      }
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

  async findByCategoryName(request: Request, response: Response) {
    try {
      await authorizationService.getAuthenticateUserOrThrow(request)
      const name = request.params.name
      if (!name) throw new InvalidParamError()
      return response.json(
        createResponse(true, await productsRepository.findByCategoryName(name)),
      )
    } catch (e: any) {
      if (e instanceof InvalidJwtError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'invalid_jwt'))
      } else if (e instanceof InvalidParamError) {
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

  async findByCategoryId(request: Request, response: Response) {
    try {
      await authorizationService.getAuthenticateUserOrThrow(request)
      const id = request.params.id
      if (!id) throw new InvalidParamError()
      return response.json(
        createResponse(true, await productsRepository.findByCategoryId(id)),
      )
    } catch (e: any) {
      if (e instanceof InvalidJwtError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'invalid_jwt'))
      } else if (e instanceof InvalidParamError) {
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
      await authorizationService.getAuthenticateUserOrThrow(request)
      const slug = request.params.slug
      if (!slug) throw new InvalidBodyError()
      return response.json(
        createResponse(true, await productsRepository.findBySlug(slug)),
      )
    } catch (e: any) {
      if (e instanceof InvalidJwtError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'invalid_jwt'))
      } else if (e instanceof InvalidParamError) {
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
      const { name, description, amount, categoryId } = request.body
      if (!name || !description || !amount || !categoryId)
        throw new InvalidBodyError()
      return response.json(
        createResponse(true, await productsRepository.save(request.body)),
      )
    } catch (e: any) {
      if (e instanceof UnauthorizedError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'you_dont_have_permissions'))
      } else if (e instanceof InvalidJwtError) {
        return response
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json(createResponse(false, 'invalid_jwt'))
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
}
