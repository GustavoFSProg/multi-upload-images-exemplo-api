-- CreateTable
CREATE TABLE "public"."Images" (
    "id" TEXT NOT NULL,
    "idProduto" TEXT NOT NULL,
    "images" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);
