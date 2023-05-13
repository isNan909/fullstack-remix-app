import bcrypt from 'bcryptjs'
import type { RegisterForm } from './types.server'
import { prisma } from './prisma.server'

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 12)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      name: user.name
    },
  })
  return { id: newUser.id, email: user.email, name: user.name }
}