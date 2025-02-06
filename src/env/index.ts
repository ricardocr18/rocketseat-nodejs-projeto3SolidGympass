import 'dotenv/config'
import { z } from 'zod'

// process.env: { NODE_ENV:}
const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333) // converte a informação para número
})

// aqui estou validando o process.env que está lá no arquivo .env
const _env = envSchema.safeParse(process.env)

if (_env.success === false){
    console.error('❌ Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables')
} 

// aqui estou exportando os dados das váriaveis de ambiente
export const env = _env.data