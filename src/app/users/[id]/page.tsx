'use client'
import { useEffect, useState } from "react";

export default function PageUser({ params }: { params: { id: string } }) {
  
  const [user, setUser] = useState<any>(null); // Aqui você pode tipar corretamente o tipo do usuário

  useEffect(() => {
    fetch(`/api/users`)
      .then((response) => response.json())
      .then((data) => {
        const userWithId = data.users.find((user: any) => user.id === params.id); // Encontra o usuário com o ID correspondente
        setUser(userWithId); // Define o usuário correspondente no estado
      });
  }, [params.id]); // Adiciona params.id como uma dependência para que o efeito seja executado quando params.id mudar

  return (
    <>
      <h1>My Page: {params.id}</h1>
      {user && (
        <div>
          <span>Nome: {user.name}</span>
          <span>Email: {user.email}</span>
          {/* Adicione mais campos conforme necessário */}
        </div>
      )}
    </>
  );
}
