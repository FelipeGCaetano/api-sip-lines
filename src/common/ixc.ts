import { IxcFilterParams } from "@/@types/ixc";
import { ApplicationError } from "@/errors/application";

export class IxcApi {
    private baseUrl: string;
    private token: string;

    constructor() {
        this.baseUrl = "https://assinante.nmultifibra.com.br/webservice/v1/";
        this.token = process.env.IXC_TOKEN as string;
    }

    async concatenatedFilter({ tableUrl, filter }:{tableUrl: string, filter: IxcFilterParams[]}) {
        const body = {
          rp: "100000",
          grid_param: JSON.stringify(filter),
        };
    
        const opt = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
            ixcsoft: "listar",
          },
          body: JSON.stringify(body),
        };

        let ixcRequest:any = await fetch(`${this.baseUrl}${tableUrl}`, opt);
        ixcRequest = await ixcRequest.json();
    
        return {
            total: ixcRequest.total,
            data: ixcRequest.registros || [],
        };
    }
}