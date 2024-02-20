import bcrypt from 'bcrypt'
import { constants } from './constants'

export const salt = bcrypt.genSaltSync(constants.salt_rounds)
