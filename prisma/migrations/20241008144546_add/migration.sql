/*
  Warnings:

  - Added the required column `assignee` to the `portabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "portabilities" ADD COLUMN     "assignee" TEXT NOT NULL;
