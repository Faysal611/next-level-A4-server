/*
  Warnings:

  - Added the required column `userId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
