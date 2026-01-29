/*
  Warnings:

  - Changed the type of `cuisine` on the `catagory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "catagory" DROP COLUMN "cuisine",
ADD COLUMN     "cuisine" VARCHAR(20) NOT NULL;

-- DropEnum
DROP TYPE "Cuisine";
