import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute ({name, email,password}: RegisterUseCaseRequest){
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
        throw new Error('E-mail já cadastrado')
    }

    // const prismaUsersRepository = new PrismaUsersRepository()
    
    await this.usersRepository.create({
        name,
        email,
        password_hash
    })
    
  }

}

