-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_idBookings_fkey";

-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "idBookings" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_idBookings_fkey" FOREIGN KEY ("idBookings") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
