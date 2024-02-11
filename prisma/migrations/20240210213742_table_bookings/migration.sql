-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "cpf_cnpj" TEXT,
    "quadra" INTEGER NOT NULL,
    "lote" INTEGER NOT NULL,
    "status_da_venda" TEXT NOT NULL DEFAULT 'Ativa',
    "benfeitoria" TEXT,
    "dt_agendamento" TEXT NOT NULL,
    "horario_do_agen" TEXT NOT NULL,
    "resp_pelo_agendamento" TEXT NOT NULL,
    "demarcador" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "obs" TEXT,
    "idBookings" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_idBookings_fkey" FOREIGN KEY ("idBookings") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
