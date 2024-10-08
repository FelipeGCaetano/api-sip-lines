import { FastifyInstance } from "fastify";
import { sendTerm, teste } from "./controllers/portability.controller";
import { createUser } from "./controllers/users.controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/portabilidade', sendTerm)
    app.post('/usuarios', createUser)
    app.get('/teste', teste)
}