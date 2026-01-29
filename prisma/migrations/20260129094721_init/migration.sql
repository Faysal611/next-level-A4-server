/*
  Warnings:

  - The primary key for the `ProviderProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `catagory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `meal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "meal" DROP CONSTRAINT "meal_cuisineId_fkey";

-- DropForeignKey
ALTER TABLE "meal" DROP CONSTRAINT "meal_providerId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_mealId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_mealId_fkey";

-- AlterTable
ALTER TABLE "ProviderProfile" DROP CONSTRAINT "ProviderProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProviderProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProviderProfile_id_seq";

-- AlterTable
ALTER TABLE "catagory" DROP CONSTRAINT "catagory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "catagory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "catagory_id_seq";

-- AlterTable
ALTER TABLE "meal" DROP CONSTRAINT "meal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "providerId" SET DATA TYPE TEXT,
ALTER COLUMN "cuisineId" SET DATA TYPE TEXT,
ADD CONSTRAINT "meal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "meal_id_seq";

-- AlterTable
ALTER TABLE "order" DROP CONSTRAINT "order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "mealId" SET DATA TYPE TEXT,
ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "order_id_seq";

-- AlterTable
ALTER TABLE "review" DROP CONSTRAINT "review_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "mealId" SET DATA TYPE TEXT,
ADD CONSTRAINT "review_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "review_id_seq";

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProviderProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "catagory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
