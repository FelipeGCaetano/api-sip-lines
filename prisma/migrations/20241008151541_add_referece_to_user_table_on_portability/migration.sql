/*
  Warnings:

  - You are about to drop the column `assignee` on the `portabilities` table. All the data in the column will be lost.
  - Added the required column `assignee_id` to the `portabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "portabilities" DROP COLUMN "assignee",
ADD COLUMN     "assignee_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "portabilities" ADD CONSTRAINT "portabilities_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
