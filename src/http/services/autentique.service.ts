import { PortabilityData } from "@/@types/autentique";
import { PrismaClient } from "@prisma/client";
import { ApplicationError } from "@/errors/application";

const prisma = new PrismaClient()

export class AutentiqueUseCase {
    async sendTerm(data: PortabilityData) {
        try {
            let client_id;
    
            const clientAlreadyExists = await prisma.client.findFirst({
                where: {
                    cpf: data.client.cpf
                }
            });
            
            if (!clientAlreadyExists) {
                const createClient = await prisma.client.create({
                    data: data.client
                });
        
                client_id = createClient.id; 
            } else {
                client_id = clientAlreadyExists.id; 
            }
    
            const portabilityAlreadyExists = await prisma.portability.findFirst({
                where: {
                    id_os: data.portability.idOs
                }
            })
    
            if (portabilityAlreadyExists) {
                throw new ApplicationError("vai toma no cu", 500)
            }
    
            const portability = await prisma.portability.create({
                data: {
                    id_os: data.portability.idOs,
                    client_id, 
                    number: [data.portability.number],
                    operator: data.portability.operator
                }
            });
    
            const opt = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    infos: {
                        name: data.client.name,
                        cpf: data.client.cpf,
                        address: data.client.address,
                        phone: data.portability.number,
                        operator: data.portability.operator,
                        email: data.client.email
                    },
                    clientId: data.client.clientId
                })
            }
    
            const requestSendTerm = await fetch("https://nmt.nmultifibra.com.br/autentique/", opt)
            const result = await requestSendTerm.json()
    
            if(result.status == "success") {
                await prisma.portability.update({
                    where: {
                        id: portability.id
                    },
                    data: {
                        status: "WAITING_SIGNATURE"
                    }
                })
            } else {
                await prisma.portability.update({
                    where: {
                        id: portability.id
                    },
                    data: {
                        status: "FAILED_TO_SEND_TERM"
                    }
                })
    
                throw new ApplicationError("Erro ao enviar o termo", 500)
            }
            
            return {
                status: result.status,
                message: result.message
            }
        } catch (err) {
            return err
        }
    }
}