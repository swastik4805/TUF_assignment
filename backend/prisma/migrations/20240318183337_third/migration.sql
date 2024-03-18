/*
  Warnings:

  - Added the required column `sourceCode` to the `codeEntries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codeEntries" ADD COLUMN     "sourceCode" TEXT NOT NULL;
