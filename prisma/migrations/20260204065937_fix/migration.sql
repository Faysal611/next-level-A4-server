-- DropForeignKey
ALTER TABLE "meal" DROP CONSTRAINT "meal_cuisineId_fkey";

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
