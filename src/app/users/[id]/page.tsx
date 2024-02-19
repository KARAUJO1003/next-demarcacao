'use client'
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  // Adicione outras propriedades conforme necessário
}

async function getData(): Promise<User[]> {
  const res = await fetch('/api/users');
  if (!res.ok) {
    // Isso ativará o Error Boundary mais próximo em 'error.js'
    throw new Error('Falha ao buscar dados');
  }
  const rawData = await res.json();
  console.log("Dados brutos da API:", rawData);
  
  // Verifique se a propriedade 'users' existe e é uma matriz
  if (!Array.isArray(rawData.users)) {
    throw new Error('Dados retornados não contêm uma matriz de usuários');
  }
  
  return rawData.users;
}

export default function PageUser({ params }: { params: { id: string } }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Codigo: {params.id}</h1>
      {users.map((item, index) => (
        <span key={index}> Nome: {item.name}</span>
      ))}
    </>
  );
}
