-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('suspended', 'active');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "status" "userStatus" DEFAULT 'active';
