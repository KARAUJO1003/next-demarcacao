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
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false)
      });
  }, []);

  return (
    <>
      {
        loading ? (
          <div className="space-y-2 flex items-center justify-center flex-col h-screen w-full">
            <Skeleton className="h-6 w-[600px]" />
            <Skeleton className="h-6 w-[600px]" />
            <Skeleton className="h-6 w-[600px]" />
            <Skeleton className="h-6 w-[600px]" />
            <Skeleton className="h-6 w-[600px]" />
          </div>
        ) : (
          <div className="w-full h-screen flex items-center justify-center">

            <div className=" h-screen flex flex-col items-center justify-center max-w-[600px]">
              <div className="flex w-full items-center justify-between mb-5 p-2">

                <h1 className="text-2xl">Lista de usuários</h1>
                <Button variant={'outline'}>
                  <Link className="no-underline" href="/">
                    Pagina inicial
                  </Link>
                </Button>
              </div>
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


            </div>
          </div>
        )
      }







    </>

  )
}