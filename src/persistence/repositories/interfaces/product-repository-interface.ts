import { Product } from '@prisma/client'
import { IDataRepository } from './data-repository'

export interface IProductRepository extends IDataRepository<Product, string> {
  findByName(name: string): Promise<Product | null>
  findBySlug(slug: string): Promise<Product | null>
  findByCategoryId(id: string): Promise<Product[]>
  findByCategoryName(name: string): Promise<Product[]>
}
