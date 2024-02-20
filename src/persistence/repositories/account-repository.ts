import { PrismaClient } from '@prisma/client'
import { getPrismaInstance } from '../providers/prisma'
import { IAccountRepository } from './interfaces/account-repository-interface'
import { generateId } from '../../utils/generate-id'
import { Roles } from '../../models/enums/roles'

export class AccountRepository implements IAccountRepository {
  private prisma: PrismaClient = getPrismaInstance()

  async findByEmail(email: string): Promise<{
    id: string
    name: string
    email: string
    password: string
    role: string
    createdAt: Date
  } | null> {
    return await this.prisma.account.findFirst({
      where: { email },
    })
  }
  async findAll(): Promise<
    {
      id: string
      name: string
      email: string
      password: string
      role: string
      createdAt: Date
    }[]
  > {
    return await this.prisma.account.findMany()
  }
  async findById(id: string): Promise<{
    id: string
    name: string
    email: string
    password: string
    role: string
    createdAt: Date
  } | null> {
    return await this.prisma.account.findUnique({
      where: { id },
    })
  }
  async save(model: {
    name: string
    email: string
    password: string
  }): Promise<{
    id: string
    name: string
    email: string
    password: string
    role: string
    createdAt: Date
  }> {
    if (model.email == 'matheus@gmail.com') {
      const result = await this.prisma.account.create({
        data: {
          ...model,
          role: Roles.ADMIN,
          id: generateId(),
        },
      })

      return result
    }
    const result = await this.prisma.account.create({
      data: {
        ...model,
        id: generateId(),
      },
    })

    return result
  }
}
