import { PrismaClient } from '@prisma/client'
import { getPrismaInstance } from '../providers/prisma'
import { IProductRepository } from './interfaces/product-repository-interface'
import { generateId } from '../../utils/generate-id'
import { generateSlug } from '../../utils/generate-slug'

export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient = getPrismaInstance()

  async findByName(name: string): Promise<{
    id: string
    name: string
    description: string
    amount: number
    slug: string
    createdAt: Date
    categoryId: string
  } | null> {
    return await this.prisma.product.findFirst({
      where: { name },
    })
  }
  async findBySlug(slug: string): Promise<{
    id: string
    name: string
    description: string
    amount: number
    slug: string
    createdAt: Date
    categoryId: string
  } | null> {
    return await this.prisma.product.findFirst({
      where: { slug },
    })
  }
  async findByCategoryId(id: string): Promise<
    {
      id: string
      name: string
      description: string
      amount: number
      slug: string
      createdAt: Date
      categoryId: string
    }[]
  > {
    return await this.prisma.product.findMany({
      where: {
        categoryId: id,
      },
    })
  }
  async findByCategoryName(name: string): Promise<
    {
      id: string
      name: string
      description: string
      amount: number
      slug: string
      createdAt: Date
      categoryId: string
    }[]
  > {
    return await this.prisma.product.findMany({
      where: {
        category: {
          name,
        },
      },
    })
  }
  async findAll(): Promise<
    {
      id: string
      name: string
      description: string
      amount: number
      slug: string
      createdAt: Date
      categoryId: string
    }[]
  > {
    return await this.prisma.product.findMany({
      take: 100,
      include: { category: true },
    })
  }
  async findById(id: string): Promise<{
    id: string
    name: string
    description: string
    amount: number
    slug: string
    createdAt: Date
    categoryId: string
  } | null> {
    return await this.prisma.product.findUnique({ where: { id } })
  }
  async save(model: {
    name: string
    description: string
    amount: number
    categoryId: string
  }): Promise<{
    id: string
    name: string
    description: string
    amount: number
    slug: string
    createdAt: Date
    categoryId: string
  }> {
    const result = await this.prisma.product.create({
      data: { id: generateId(), ...model, slug: generateSlug(model.name) },
    })
    return result
  }
}
