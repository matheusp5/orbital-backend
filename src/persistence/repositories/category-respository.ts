import { PrismaClient } from '@prisma/client'
import { getPrismaInstance } from '../providers/prisma'
import { ICategoryRepository } from './interfaces/category-repository-interface'
import { generateId } from '../../utils/generate-id'
import { generateSlug } from '../../utils/generate-slug'

export class CategoryRepository implements ICategoryRepository {
  private prisma: PrismaClient = getPrismaInstance()

  async findByName(name: string): Promise<{
    id: string
    name: string
    slug: string
    description: string
    createdAt: Date
  } | null> {
    return await this.prisma.category.findFirst({
      where: { name },
      include: {
        Product: true,
      },
    })
  }
  async findBySlug(slug: string): Promise<{
    id: string
    name: string
    slug: string
    description: string
    createdAt: Date
  } | null> {
    return await this.prisma.category.findFirst({
      where: {
        slug,
      },
      include: {
        Product: true,
      },
    })
  }
  async findAll(): Promise<
    {
      id: string
      name: string
      slug: string
      description: string
      createdAt: Date
    }[]
  > {
    return await this.prisma.category.findMany({
      take: 100,
    })
  }
  async findById(id: string): Promise<{
    id: string
    name: string
    slug: string
    description: string
    createdAt: Date
  } | null> {
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        Product: true,
      },
    })
  }
  async save(model: { name: string; description: string }): Promise<{
    id: string
    name: string
    slug: string
    description: string
    createdAt: Date
  }> {
    const result = await this.prisma.category.create({
      data: { ...model, id: generateId(), slug: generateSlug(model.name) },
    })
    return result
  }
}
