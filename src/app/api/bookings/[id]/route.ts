import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../prisma/generated/client";

const prisma = new PrismaClient()


export async function DELETE({ params} : {params: {id: string}}) {

  const id = params.id

  try {
    // Exclui o item com base no ID fornecido
    const deletedBooking = await prisma.bookings.delete({
      where: {id: id} ,
    });
    return NextResponse.json(deletedBooking);
  } catch (error) {
    console.error('Erro ao excluir o item:', error);
    return NextResponse.json({ error: 'Erro interno do servidor', message: 'Erro no servidor', status: 500 });
  }
}