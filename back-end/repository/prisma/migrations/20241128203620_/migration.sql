/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Bike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bike_id_key" ON "Bike"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_id_key" ON "Rent"("id");
