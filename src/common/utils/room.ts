import { hash } from 'bcrypt'

import { PASSWORD_SALT_ROUNDS } from '@constants'

export const generateHashPassword: (password: string) => Promise<string> = async (password: string) => {
    return hash(password, PASSWORD_SALT_ROUNDS)
}
