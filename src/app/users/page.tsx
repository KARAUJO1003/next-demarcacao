"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@prisma/client";
import { AtSign, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUser(data.users));
  }, []);

  return (
    <main className=" flex items-center justify-center flex-col h-screen">
      <h1 className="text-xl font-bold mb-5">Lista de usuários cadastrados</h1>

      <ul className="flex gap-2 flex-col p-10 border rounded shadow-lg max-h-96 ">
        <ScrollArea>
          {users.map((user: User) => (
            <li key={user.id} className="flex flex-col  border p-2">
              <span className="flex items-center gap-2"><UserRound size={16}/> {user.name}</span>
              <span className="flex items-center gap-2"><AtSign size={16}/>{user.email}</span>
            </li>
          ))}
        </ScrollArea>
      </ul>
    </main>
  );
};

export default UserList;
