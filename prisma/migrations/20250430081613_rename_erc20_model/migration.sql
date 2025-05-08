/*
  Warnings:

  - You are about to drop the `ERC20Token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ERC20Token";

-- CreateTable
CREATE TABLE "erc20token" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,

    CONSTRAINT "erc20token_pkey" PRIMARY KEY ("id")
);
