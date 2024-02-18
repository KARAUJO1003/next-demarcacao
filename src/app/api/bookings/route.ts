
import { PrismaClient } from "../../../../prisma/generated/client";
import type { Bookings } from "../../../../prisma/generated/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();



export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    const newBooking:Bookings = await prisma.bookings.create({
      data: body,
    });
    return res.status(201).json(newBooking);
  } catch (error) {
    console.error('Erro ao criar o booking:', error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const bookings = await prisma.bookings.findMany();
  return Response.json({ bookings });
}