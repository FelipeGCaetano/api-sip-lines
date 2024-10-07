import { IxcApi } from "@/common/ixc";
import { IxcFilterParams, SipOSResult } from "@/@types/ixc";
import { ApplicationError } from "@/errors/application";
import { readFileSync } from "fs";

export class IxcUseCase {
    async checkSipOS() {
        const collaborators = JSON.parse(readFileSync("/home/NmultiSip/files/commercial_colaborators.json"))
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
            result.push({
                id: os.id,
                ClientId: os.id_cliente,
                assignee: collaborators.find((item: SipOSResult) => item.id === os.id_tecnico).funcionario,
                Status: "aberto"
            })
        }

        return result
    }
}