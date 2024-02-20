"use client";
import { useEffect, useState } from "react";
import { Bookings } from "../../../../prisma/generated/client";
import { Modal } from "@/components/Modal";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MinusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TagBadge } from "@/components";

async function getData(): Promise<Bookings[]> {
  const res = await fetch("/api/bookings");
  if (!res.ok) {
    // Isso ativará o Error Boundary mais próximo em 'error.js'
    throw new Error("Falha ao buscar dados");
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
        const bookingWithId = data.find(
          (item: Bookings) => item.id === params.id
        );
        if (bookingWithId !== undefined) {
          setBooking(bookingWithId);
        } else {
          console.error("Booking com ID não encontrado:", params.id);
        }
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {booking && (
        <Card className="max-w-[500px] min-w-[400px]">
          <CardHeader>
            <CardTitle className="text-md ">
              <span className="uppercase">{booking.cliente}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 ">
            <TagBadge nometag={booking.status} filtertag={booking.status}/>
            <div className="grid grid-cols-2">
              <div className="col-span-1 space-y-2">
                <CardDescription>CPF {booking.cpf_cnpj}</CardDescription>
                <CardDescription>
                  Quadra {booking.quadra} Lote {booking.lote}
                </CardDescription>
                <CardDescription>Data {booking.dt_agendamento}</CardDescription>
                <CardDescription>
                  às {booking.horario_do_agen} horas
                </CardDescription>
              </div>
              <div className="col-span-1">
              </div>
            </div>
            <CardDescription> Observação</CardDescription>
            <Textarea disabled value={booking.obs ?? ''}/>
          </CardContent>

          <CardFooter>
            <Button variant={"outline"}>
              <Link href={"/"}>Voltar</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
