"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Modal } from "@/components/Modal";
import TableItens from "@/components/TableItens";
import CardItem from "@/components/CardItem";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import { Bookings } from "../../prisma/generated/client";
import CardSkeleton from "@/components/CardSkeleton";

export default function Home() {
  const [exibirAgendadas, setExibirAgendadas] = useState(true);
  const [exibirDemarcadas, setExibirDemarcadas] = useState(true);
  const [loading, setLoading] = useState(true);
  const [demarcacao, setDemarcacao] = useState<Bookings[]>([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        setDemarcacao(data);
        setLoading(false);
      });
  }, []);

  const handleTabChange = (value: any) => {
    // Atualize o estado de exibição com base na guia selecionada
    setExibirAgendadas(value === "Agendado");
    setExibirDemarcadas(value === "Demarcado");
  };
  const demarcacaoFiltrada = demarcacao.filter((item) => {
    return (
      (exibirAgendadas && item.status === "Agendado") ||
      (exibirDemarcadas && item.status === "Demarcado")
    );
  });
  const demarcacaoFiltradaAgendada = demarcacaoFiltrada.filter(
    (item) => item.status === "Agendado"
  );
  const demarcacaoFiltradaDemarcado = demarcacaoFiltrada.filter(
    (item) => item.status === "Demarcado"
  );

  return (
    <main className=" min-h-screen w-full  grid grid-cols-[300px,_minmax(900px,_1fr)]">

      <div>
        <SideBar />
      </div>

      <Tabs
        defaultValue="Agendado"
        onValueChange={handleTabChange}
        className="w-full py-5 px-5 bg-secondary dark:bg-background"
      >
        <div className="flex gap-2 w-full border-b pb-2 bg-transparent items-center justify-between">
          <TabsList className="">

            <TabsTrigger value="Agendado" className="text-foreground">
              Agendado
            </TabsTrigger>

            <TabsTrigger value="Demarcado" className="text-foreground">
              Demarcado
            </TabsTrigger>

          </TabsList>
          <Modal />
        </div>

        <TabsContent value="Agendado">
          <ScrollArea className="outline-none">
            {loading == true ? (
              <div className="flex items-center gap-2">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <ul className="flex gap-3 min-h-64">
                {demarcacaoFiltradaAgendada.map((item, id) => (
                  <li
                    key={id}
                    className={`  mb-3 flex flex-col min-w-80 h-min `}
                  >
                    <Link href={`/bookings/${item.id}`}>
                      <CardItem
                        cliente={item.cliente}
                        quadra={item.quadra}
                        lote={item.lote}
                        dt_agendamento={item.dt_agendamento}
                        horario_do_agen={item.horario_do_agen}
                        demarcador={item.demarcador}
                        status={item.status}
                        empresa={item.empresa}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="Demarcado">
          <ScrollArea className="outline-none">
            {loading == true ? (
              <div className="flex items-center gap-2">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <ul className="flex gap-3 min-h-64">
                {demarcacaoFiltradaDemarcado.map((item, id) => (
                  <li
                    key={id}
                    className={`  mb-3 flex flex-col min-w-80 h-min `}
                  >
                    <Link href={`/bookings/${item.id}`}>
                      <CardItem
                        cliente={item.cliente}
                        quadra={item.quadra}
                        lote={item.lote}
                        dt_agendamento={item.dt_agendamento}
                        horario_do_agen={item.horario_do_agen}
                        demarcador={item.demarcador}
                        status={item.status}
                        empresa={item.empresa}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>

        <TableItens />
      </Tabs>
    </main>
  );
}
