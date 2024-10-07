-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_PROGRESS', 'OPEN', 'COMPLETE', 'REFUSED', 'WAITING_SIGNATURE', 'WAITING_TIP', 'FAILED_TO_SEND_TERM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ixcId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portabilities" (
    "id" TEXT NOT NULL,
    "id_os" INTEGER NOT NULL,
    "client_id" TEXT NOT NULL,
    "signed" BOOLEAN NOT NULL DEFAULT false,
    "signed_at" TIMESTAMP(3),
    "number" TEXT[],
    "operator" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portabilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "portabilities_id_os_key" ON "portabilities"("id_os");

-- AddForeignKey
ALTER TABLE "portabilities" ADD CONSTRAINT "portabilities_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
