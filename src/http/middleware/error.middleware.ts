import { FastifyReply, FastifyRequest } from "fastify";
import { ApplicationError, ResponseError } from "../../errors/application";

export function ErrorMiddleware( err: Error, req: FastifyRequest, res: FastifyReply) {
    
    const isApplicationError = err instanceof ApplicationError;
    
    let resObj: ResponseError = {
        status: "error",
        message: err.message
    };
    
    if(isApplicationError && err.details) resObj.details = err.details;

    return res.status(isApplicationError ? err.statusCode : 400).send(resObj);      
}
