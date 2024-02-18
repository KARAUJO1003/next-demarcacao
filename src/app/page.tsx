"use client";

import { AgendaItem, Demarcacao } from "@/app/ag";
import { PrismaClient } from "../../prisma/generated/client"
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Modal } from "@/components/Modal";
import TableItens from "@/components/TableItens";
import CardItem from "@/components/CardItem";
import SideBar from "@/components/SideBar";
import { Bookings } from "../../prisma/generated/client";
import { log } from "console";



export default function Home() {
  const [exibirAgendadas, setExibirAgendadas] = useState(true);
  const [exibirDemarcadas, setExibirDemarcadas] = useState(true);
  const [demarcacao, setDemarcacao] = useState<AgendaItem[]>([  ]);

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
        <TabsList className="w-full border-b pb-2 bg-transparent items-center justify-between">
          <div className="flex gap-2">
            <TabsTrigger value="Agendado" className="text-foreground">Agendado</TabsTrigger>
            <TabsTrigger value="Demarcado" className="text-foreground">Demarcado</TabsTrigger>
          </div>
          <Modal />
        </TabsList>
        <TabsContent value="Agendado">
          <ScrollArea className="outline-none">
            <ul className="flex gap-3 min-h-64">
              {demarcacaoFiltradaAgendada.map((item, id) => (
                <li key={id} className={`  mb-3 flex flex-col min-w-80 h-min `}>
                  <CardItem
                    user={item.cliente}
                    qd={item.quadra}
                    lt={item.lote}
                    date={item.dt_agendamento}
                    timer={item.horario_do_agen}
                    demarcador={item.demarcador}
                    status={item.status}
                    empresa={item.empresa}
                  />
                </li>
              ))}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="Demarcado">
          <ScrollArea className="outline-none">
            <ul className="flex gap-3 ">
              {demarcacaoFiltradaDemarcado.map((item, id) => (
                <li
                  key={id}
                  className={` rounded-md mb-3  flex flex-col min-w-80 h-min `}
                >
                  <CardItem
                    user={item.cliente}
                    qd={item.quadra}
                    lt={item.lote}
                    date={item.dt_agendamento}
                    timer={item.horario_do_agen}
                    demarcador={item.demarcador}
                    empresa={item.empresa}
                  />
                </li>
              ))}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
        <TableItens />

      </Tabs>
    </main>
  );
}
