import { hash } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const authenticateUseCase = new AuthenticateUseCase({
      async findByEmail(email) {
        if (email === 'johndoe@example.com') {
          return {
            id: 'user-1',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
            created_at: new Date(),
          }
        }
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const authenticateUseCase = new AuthenticateUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const authenticateUseCase = new AuthenticateUseCase({
      async findByEmail(email) {
        if (email === 'johndoe@example.com') {
          return {
            id: 'user-1',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
            created_at: new Date(),
          }
        }
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
