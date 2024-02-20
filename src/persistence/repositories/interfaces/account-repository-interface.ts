import { Account } from '@prisma/client'
import { IDataRepository } from './data-repository'

export interface IAccountRepository extends IDataRepository<Account, string> {
  findByEmail(email: string): Promise<Account | null>
}
