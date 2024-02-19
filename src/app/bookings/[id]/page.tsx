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
  const [bookings, setBookings] = useState<Bookings[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setBookings(data);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Código: {params.id}</h1>
      {bookings.map((item, index) => (
        <div key={item.id}>
          <span>Nome: {item.cliente}</span>
        </div>
      ))}
    </>
  );
}
