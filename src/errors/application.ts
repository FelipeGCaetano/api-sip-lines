export type ErrorStatusCode = 400 | 401 | 404 | 500;

export type ResponseError = {
    status: "error",
    message: string,
    details?: any
}

export class ApplicationError extends Error{
    public statusCode: ErrorStatusCode;
    public details: any | undefined;

    constructor(message: string, statusCode?: ErrorStatusCode, details?: any){
        super(message);

        this.message = message;
        this.statusCode = statusCode || 400;
        this.details = details;
    }
}
