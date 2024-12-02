-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRent" (
    "userId" INTEGER NOT NULL,
    "rentId" INTEGER NOT NULL,
    "rentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRent_pkey" PRIMARY KEY ("userId","rentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "UserRent" ADD CONSTRAINT "UserRent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRent" ADD CONSTRAINT "UserRent_rentId_fkey" FOREIGN KEY ("rentId") REFERENCES "Rent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
