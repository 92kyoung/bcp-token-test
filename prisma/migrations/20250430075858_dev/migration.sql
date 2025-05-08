-- CreateTable
CREATE TABLE "ERC20Token" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,

    CONSTRAINT "ERC20Token_pkey" PRIMARY KEY ("id")
);
