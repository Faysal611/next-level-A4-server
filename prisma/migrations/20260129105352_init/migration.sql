/*
  Warnings:

  - A unique constraint covering the columns `[cuisine]` on the table `catagory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "catagory_cuisine_key" ON "catagory"("cuisine");
