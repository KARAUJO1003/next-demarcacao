"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "../../../prisma/generated/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-5">Lista de usuários</h1>
      <div>
        <Table className="border rounded-md">
          <TableHeader>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <Link href={`/users/${user.id}`}>
                  <TableCell>{user.name}</TableCell>
                </Link>
                  <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button className="bg-emerald-600 hover:bg-emerald-500 text-zinc-50 mt-5">
        <Link className="no-underline" href="/">
          Pagina inicial
        </Link>
      </Button>
    </div>
  );
}
