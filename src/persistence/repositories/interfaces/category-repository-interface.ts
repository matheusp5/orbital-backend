import { Category } from '@prisma/client'
import { IDataRepository } from './data-repository'

export interface ICategoryRepository extends IDataRepository<Category, string> {
  findByName(name: string): Promise<Category | null>
  findBySlug(slug: string): Promise<Category | null>
}
