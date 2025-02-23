-- CreateTable
CREATE TABLE "Pedidos" (
    "id" SERIAL NOT NULL,
    "pedido" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);
