export interface PortabilityData {
    client: {
        clientId: string,
        name: string,
        cpf: string,
        address: string,
        email: string
    },
    portability: {
        number: string,
        operator: string,
        idOs: string
    }
}