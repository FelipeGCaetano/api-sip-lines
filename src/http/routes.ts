import { FastifyInstance } from "fastify";
import { sendTerm, teste } from "./controllers/portability.controller";

export async function appRoutes(app: FastifyInstance) {
    app.post('/portabilidade', sendTerm)
    app.get('/teste', teste)
}