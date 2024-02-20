import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | null
const getPrismaInstance = () => {
  if (!prisma) prisma = new PrismaClient()
  return prisma
}

export { getPrismaInstance }
