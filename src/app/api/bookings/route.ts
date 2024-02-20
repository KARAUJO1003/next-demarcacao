import { NextRequest, NextResponse } from "next/server";
import { Bookings, PrismaClient } from "../../../../prisma/generated/client";
import type { NextApiRequest, NextApiResponse } from "next";

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
    return NextResponse.json(newBooking);
  } catch (error) {
    return NextResponse.json({ message: "Erro de validação", error });
  }
}
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { empresa, cliente, cpf_cnpj, quadra, lote, status, benfeitoria, dt_agendamento, horario_do_agen, resp_pelo_agendamento, demarcador, status_da_venda, obs } = await req.body
  const { id } = req.query;

  try {
    // Atualiza o item com base no ID fornecido
    const updatedBooking = await prisma.bookings.update({
      where: { id: id as string },
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
    return res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Erro ao atualizar o item:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
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

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {

//       const body= req.body as Bookings;

//       const newBooking = await prisma.bookings.create({
//         data: body
//       });
//       return res.status(201).json(newBooking);
//   } else if (req.method === 'GET') {
//     try {
//       const bookings = await prisma.bookings.findMany();
//       return res.status(200).json({ bookings });
//     } catch (error) {
//       console.error('Erro ao buscar os bookings:', error);
//       return res.status(500).json({ erro: 'Erro interno do servidor' });
//     }
//   } else {
//     return res.status(405).end(); // Método não permitido
//   }
// }
