import { z, ZodError } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { AutentiqueUseCase } from '../services/autentique.service'
import { IxcUseCase } from '../services/ixc.service'
import { ApplicationError } from '@/errors/application'

export async function sendTerm(req: FastifyRequest, res: FastifyReply) {
    // const sendTermBodySchema = z.object({
    //     client: z.object({
    //         clientId: z.number(),
    //         name: z.string(),
    //         cpf: z.string(),
    //         address: z.string(),
    //         email: z.string().email()
    //     }),
    //     portability: z.object({
    //         number: z.string(),
    //         operator: z.string(),
    //         idOs: z.number()
    //     })
    // })
    
    try {
        //const data = sendTermBodySchema.parse(JSON.parse(req.body as string))
        const data = req.body
        console.log(data)
        const autentiqueService = new AutentiqueUseCase()

        const termStatus = await autentiqueService.sendTerm(data)
        
        return res.status(200).send(termStatus)

    } catch (err) {
        if (err instanceof ZodError) {
            const errorObj = err.issues.map((issue) => { return { param: issue.path[0], message: issue.message } })
            throw new ApplicationError("Foram encontrados os seguintes erros:", 400, errorObj)
        }
    }
}

export async function teste(req: FastifyRequest, res: FastifyReply) {
    const ixc = new IxcUseCase()

    const t = await ixc.checkSipOS()

    return res.send(t)
}