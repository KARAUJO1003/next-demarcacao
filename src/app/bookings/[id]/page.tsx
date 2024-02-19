'use client'
import { useEffect, useState } from "react";
import { Bookings } from "../../../../prisma/generated/client";

async function getData(): Promise<Bookings[]> {
  const res = await fetch('/api/bookings');
  if (!res.ok) {
    // Isso ativará o Error Boundary mais próximo em 'error.js'
    throw new Error('Falha ao buscar dados');
  }
  const rawData = await res.json();
  console.log("Dados brutos da API:", rawData);
  
  return rawData;
}

export default function PageUser({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<Bookings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const bookingWithId = data.find((item: Bookings) => item.id === params.id);
        if (bookingWithId !== undefined) {
          setBooking(bookingWithId);
        } else {
          console.error('Booking com ID não encontrado:', params.id);
        }
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <>
      {booking && (
        <div className="flex flex-col">
          <h1>Olá {booking.cliente}</h1>
          <span>Nome: {booking.cliente}</span>
          <span> {booking.cpf_cnpj}</span>
          <span> {booking.dt_agendamento}</span>
          <span> {booking.horario_do_agen}</span>
          <span> {booking.status}</span>
          {/* Adicione mais campos conforme necessário */}
        </div>
      )}
    </>
  );
}
