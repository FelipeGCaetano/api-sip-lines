export interface PortabilityData {
    client: {
        clientId: number,
        name: string,
        cpf: string,
        address: string,
        email: string
    },
    portability: {
        number: string,
        operator: string,
        idOs: number
    }
}