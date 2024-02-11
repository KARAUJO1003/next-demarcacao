import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../prisma/generated/client";
import type { Bookings } from "../../../../prisma/generated/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const body: Bookings = await req.json();
  try {
    // Supondo que você tenha o ID do usuário apropriado
    const userId = body.idBookings;

    // Criando o novo booking
    const bookings = await prisma.bookings.create({
      data: {
        empresa: body.empresa,
        cliente: body.cliente,
        cpf_cnpj: body.cpf_cnpj,
        quadra: body.quadra,
        lote: body.lote,
        dt_agendamento: body.dt_agendamento,
        horario_do_agen: body.horario_do_agen,
        resp_pelo_agendamento: body.resp_pelo_agendamento,
        demarcador: body.demarcador,
        status: body.status,
        obs: body.obs,
        // Estabelecendo a relação com o usuário existente
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Erro ao criar o booking:", error);
  } finally {
    await prisma.$disconnect();
  }
};
