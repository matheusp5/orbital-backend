export interface IDataRepository<M, Type> {
  findAll(): Promise<M[]>
  findById(id: Type): Promise<M | null>
  save(model: M): Promise<M>
}
