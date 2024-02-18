-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "empresa" DROP NOT NULL,
ALTER COLUMN "dt_agendamento" DROP NOT NULL,
ALTER COLUMN "horario_do_agen" DROP NOT NULL,
ALTER COLUMN "resp_pelo_agendamento" DROP NOT NULL,
ALTER COLUMN "demarcador" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
