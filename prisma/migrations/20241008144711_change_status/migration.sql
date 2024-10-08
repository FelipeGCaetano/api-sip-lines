-- DropForeignKey
ALTER TABLE "portabilities" DROP CONSTRAINT "portabilities_client_id_fkey";

-- AlterTable
ALTER TABLE "portabilities" ALTER COLUMN "client_id" DROP NOT NULL,
ALTER COLUMN "operator" DROP NOT NULL,
ALTER COLUMN "assignee" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "portabilities" ADD CONSTRAINT "portabilities_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
