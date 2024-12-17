/*
  Warnings:

  - The values [dueño] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('jugador', 'dueno');
ALTER TABLE "Usuarios" ALTER COLUMN "rol" DROP DEFAULT;
ALTER TABLE "Usuarios" ALTER COLUMN "rol" TYPE "UserRole_new" USING ("rol"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "Usuarios" ALTER COLUMN "rol" SET DEFAULT 'jugador';
COMMIT;
