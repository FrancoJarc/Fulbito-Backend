/*
  Warnings:

  - The `rol` column on the `Usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('jugador', 'dueño');

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "rol",
ADD COLUMN     "rol" "UserRole" NOT NULL DEFAULT 'jugador';
