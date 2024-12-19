/*
  Warnings:

  - Added the required column `id_usuario` to the `Canchas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Canchas" ADD COLUMN     "id_usuario" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Canchas" ADD CONSTRAINT "Canchas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
