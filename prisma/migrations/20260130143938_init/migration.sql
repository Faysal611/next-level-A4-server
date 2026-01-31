/*
  Warnings:

  - Added the required column `providerId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "providerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProviderProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
