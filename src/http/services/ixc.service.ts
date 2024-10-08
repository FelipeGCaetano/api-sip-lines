import { IxcApi } from "@/common/ixc";
import { IxcFilterParams, SipOSResult } from "@/@types/ixc";
import { ApplicationError } from "@/errors/application";
import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class IxcUseCase {
    async checkSipOS() {
        const ixc = new IxcApi()
        const filter: IxcFilterParams[] = [
            {
                TB: "su_oss_chamado.id_assunto",
                OP: "=",
                P: "234",
                C: "AND",
                G: "id_assunto"
            },
            {
                TB: "su_oss_chamado.status",
                OP: "=",
                P: "EN",
                C: "AND",
                G: "status"
            }
        ]

        const querySipOS = await ixc.concatenatedFilter({
            tableUrl: "su_oss_chamado",
            filter
        })

        if (querySipOS.total == 0) throw new ApplicationError("Nenhuma O.S encaminhada", 404)

        const result: SipOSResult[] = []

        for (let os of querySipOS.data) {
            const user = await prisma.user.findFirst({
                where: {
                    ixcId: Number(os.id_tecnico)
                }
            })

            const portabilityAlreadyExists = await prisma.portability.findFirst({
                where: {
                    id_os: os.id
                }
            })

            if(portabilityAlreadyExists) {
                await prisma.portability.update({
                    where: {
                        id_os: os.id
                    },
                    data: {
                        assignee_id: user?.id
                    }
                }) 
                continue
            }

            await prisma.portability.create({
                data: {
                    id_os: os.id,
                    assignee_id: user?.id
                }
            })

            result.push({
                id: os.id,
                ClientId: os.id_cliente,
                assignee: user?.name!,
                Status: "aberto"
            })
        }

        if (result.length < 1) {
            return "Nenhuma nova O.S gerada"
        }

        return result
    }
}