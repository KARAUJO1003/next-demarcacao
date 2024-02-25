import { NextRequest, NextResponse } from "next/server";
import { Bookings, PrismaClient } from "../../../../prisma/generated/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function POST(req: Request, res: NextApiResponse) {
  const { empresa, cliente, cpf_cnpj, quadra, lote, status, benfeitoria, dt_agendamento, horario_do_agen, resp_pelo_agendamento, demarcador, status_da_venda, obs } = await req.json()

  try {
    const newBooking = await prisma.bookings.create({
      data: {
        empresa,
        cliente,
        cpf_cnpj,
        quadra,
        lote,
        status,
        benfeitoria,
        dt_agendamento,
        horario_do_agen,
        resp_pelo_agendamento,
        demarcador,
        status_da_venda,
        obs
      },
    });
    console.log(req.body)
    // console.log(newBooking)
    revalidateTag('get-bookings')
    return NextResponse.json(newBooking);
  } catch (error) {
    return NextResponse.json({ message: "Erro de validação", error });
  }
}

export async function PUT(req: Request, res: NextApiResponse) {
  const { id, empresa, cliente,  quadra, lote, status,dt_agendamento,
    horario_do_agen, } = await req.json()

  try {
    // Atualiza o item com base no ID fornecido
    const updatedBooking = await prisma.bookings.update({
      where: { id },
      data: {
        empresa,
        cliente,
        quadra,
        lote,
        status,
        dt_agendamento,
        horario_do_agen,

      },
    });
    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Erro ao atualizar o item:', error);
    return NextResponse.json({ error: 'Erro interno do servidor',message: 'Erro no servidor ', status: 500 });
  }
}

export async function GET() {
  try {
    const data = await prisma.bookings.findMany();
    return Response.json(data);
  } catch {
    return Response.json({ message: "Erro de validação" });
  }
}

