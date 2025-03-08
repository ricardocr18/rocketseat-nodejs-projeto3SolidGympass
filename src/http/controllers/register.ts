import { FastifyRequest, FastifyReply } from "fastify"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })
  
    const { name, email, password } = registerBodySchema.parse(request.body)

    // validar e criar um hash para senha
    const password_hash = await hash(password, 6)

    // aqui vejo se já tem algum email cadastrado
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })
    
    // se tem e-mail cadastrado eu dou um aviso
    if (userWithSameEmail){
        return reply.status(409).send({message: 'E-mail já cadastrado'})
    }
  
    await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })
  
    return reply.status(201).send()  
  }