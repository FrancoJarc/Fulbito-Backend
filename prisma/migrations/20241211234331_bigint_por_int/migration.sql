/*
  Warnings:

  - You are about to alter the column `dni` on the `Usuarios` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `telefono` on the `Usuarios` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Usuarios" ALTER COLUMN "dni" SET DATA TYPE INTEGER,
ALTER COLUMN "telefono" SET DATA TYPE INTEGER;
