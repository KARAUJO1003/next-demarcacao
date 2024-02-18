import { PrismaClient } from "../../../../prisma/generated/client";
import type { Bookings } from "../../../../prisma/generated/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      empresa,
      cliente,
      cpf_cnpj,
      quadra,
      lote,
      status_da_venda,
      benfeitoria,
      dt_agendamento,
      horario_do_agen,
      resp_pelo_agendamento,
      demarcador,
      status,
      obs,
    } = req.body;
    try {
      const newBooking = await prisma.bookings.create({
        data: {
          empresa: req.body.empresa,
          cliente:req.body.cliente,
          cpf_cnpj:req.body.cpf_cnpj,
          quadra:req.body.quadra,
          lote:req.body.lote,
          status_da_venda:req.body.status,
          benfeitoria:req.body.benfeitoria,
          dt_agendamento:req.body.dt_agendamento,
          horario_do_agen:req.body.horario_do_agen,
          resp_pelo_agendamento:req.body.resp_pelo_agendamento,
          demarcador:req.body.demarcador,
          status:req.body.status,
          obs:req.body.obs,
        }
      });
      return res.status(201).json(newBooking);
    } catch (error) {
      console.error("Erro ao criar o booking:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  } else if (req.method === "GET") {
    try {
      const bookings = await prisma.bookings.findMany();
      return res.status(200).json({ bookings });
    } catch (error) {
      console.error("Erro ao buscar os bookings:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  } else {
    return res.status(405).end(); // Método não permitido
  }
}
