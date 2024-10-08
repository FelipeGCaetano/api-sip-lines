import { PrismaClient, User } from "@prisma/client";
import { CreateUser } from "@/@types/users";
import { ApplicationError } from "@/errors/application";

const prisma = new PrismaClient()

export class UsersUseCase {
    async create(data: CreateUser): Promise<User> {
        const userWithSameId = await prisma.user.findFirst({
            where: {
                ixcId: data.ixcId
            }
        })

        if (userWithSameId) {
            throw new ApplicationError("Usuário já cadastrado", 400)
          }

        const createUser = await prisma.user.create({
            data
        })

        if(!createUser) {
            throw new ApplicationError("Falha ao criar usuário", 500)
        }

        return createUser
    }
}