import { randomUUID } from 'crypto'

export function generateId() {
  const id = randomUUID().split('-')
  return id[1] + id[4] + id[2]
}
