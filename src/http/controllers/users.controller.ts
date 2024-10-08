import { z, ZodError } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ApplicationError } from '@/errors/application'
import { UsersUseCase } from '../services/users.service'

export async function createUser(req: FastifyRequest, res: FastifyReply) {
    const sendTermBodySchema = z.object({
        name: z.string(),
        ixcId: z.number()
    })
    
    try {
        //const data = sendTermBodySchema.parse(parseJSONString(req.body as string));
        const data = sendTermBodySchema.parse(req.body)

        const usersService = new UsersUseCase()

        const createUser = await usersService.create(data)
        
        return res.status(200).send(createUser)

    } catch (err) {
        if (err instanceof ZodError) {
            const errorObj = err.issues.map((issue) => { return { param: issue.path[0], message: issue.message } })
            throw new ApplicationError("Foram encontrados os seguintes erros:", 400, errorObj)
        } else {
            console.log(err)
        }
    }
}
