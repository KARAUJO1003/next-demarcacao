'use client'
import { useEffect, useState } from "react";

export default function PageUser({ params }: { params: { id: string } }) {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  return <>
  <h1>My Page: {params.id}</h1>
  {users.map((user)=>(

  <h2>{user}</h2>
  ))}
  </>
}