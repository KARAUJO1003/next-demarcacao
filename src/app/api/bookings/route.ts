import { NextRequest } from "next/server";
import {
  Bookings,
  PrismaClient,
} from "../../../../prisma/generated/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { cliente, quadra, lote } = req.body as unknown as Bookings;
  try {
    const newBooking = await prisma.bookings.create({
      data: {
        cliente: cliente,
        quadra: quadra,
        lote: lote,
      },
    });
    return Response.json(newBooking);
  } catch (error) {
    return Response.json({ message: "Erro de validação", error });
  }
}

export async function GET() {
  try {
    const data = await prisma.bookings.findMany();
    return Response.json(data);
  } catch {}
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
