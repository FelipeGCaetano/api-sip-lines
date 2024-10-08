-- DropForeignKey
ALTER TABLE "portabilities" DROP CONSTRAINT "portabilities_assignee_id_fkey";

-- AlterTable
ALTER TABLE "portabilities" ALTER COLUMN "assignee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "portabilities" ADD CONSTRAINT "portabilities_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
