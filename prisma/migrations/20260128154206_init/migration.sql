-- CreateEnum
CREATE TYPE "status" AS ENUM ('pending', 'delivered', 'cancelled');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('admin', 'provider', 'customer');

-- CreateEnum
CREATE TYPE "Cuisine" AS ENUM ('Italian', 'Chinese', 'Mexican', 'Indian', 'French', 'Japanese', 'Thai', 'American', 'Greek', 'Peranakan', 'Turkish', 'Lebanese', 'Spanish', 'Moroccan', 'Korean', 'Vietnamese', 'Indonesian', 'Filipino', 'Malaysian', 'Brazilian', 'Peruvian', 'Caribbean', 'Argentinian', 'Ethiopian', 'Nigerian', 'Egyptian', 'German', 'British', 'Portuguese');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" "roles" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "about" VARCHAR(250),
    "restaurant" VARCHAR(50) NOT NULL,

    CONSTRAINT "ProviderProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "providerId" INTEGER NOT NULL,
    "ingredients" TEXT[],
    "tags" TEXT[],
    "description" TEXT NOT NULL,
    "cuisineId" INTEGER NOT NULL,

    CONSTRAINT "meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" VARCHAR(250) NOT NULL,
    "mealId" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "status" "status" NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catagory" (
    "id" SERIAL NOT NULL,
    "cuisine" "Cuisine" NOT NULL,

    CONSTRAINT "catagory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderProfile_userId_key" ON "ProviderProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "meal_providerId_key" ON "meal"("providerId");

-- AddForeignKey
ALTER TABLE "ProviderProfile" ADD CONSTRAINT "ProviderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProviderProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal" ADD CONSTRAINT "meal_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "catagory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
