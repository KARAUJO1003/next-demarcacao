"use client";

import { AgendaItem, Demarcacao } from "@/app/ag";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Modal } from "@/components/Modal";
import TableItens from "@/components/TableItens";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Timer, TimerIcon, User } from "lucide-react";
import CardItem from "@/components/CardItem";
import SideBar from "@/components/SideBar";

export default function Home() {
  const [exibirAgendadas, setExibirAgendadas] = useState(true);
  const [exibirDemarcadas, setExibirDemarcadas] = useState(true);
  const [demarcacao, setDemarcacao] = useState<AgendaItem[]>([]);

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
  const handleAddItem: (newItem: AgendaItem) => void = (newItem) => {
    setDemarcacao((prevDemarcacao) => [...prevDemarcacao, newItem]);
    console.log(demarcacao);
  };

  return (
    <main className=" min-h-screen w-full grid grid-cols-[200px_minmax(900px,_1fr)]">
        <SideBar />
        <Tabs
          defaultValue="Agendado"
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="w-full border-b pb-2 bg-transparent items-center justify-between">
            <div className="flex gap-2">
              <TabsTrigger value="Agendado">Agendada</TabsTrigger>
              <TabsTrigger value="Demarcado">Demarcado</TabsTrigger>
            </div>
            <Modal onAddItem={handleAddItem} />
          </TabsList>
          <TabsContent value="Agendado">
            <ScrollArea>
              <ul className="flex gap-3 ">
                {demarcacaoFiltradaAgendada.map((item, id) => (
                  <li
                    key={id}
                    className={`  mb-3 flex flex-col min-w-80 h-min `}
                  >
                    <CardItem
                      user={item.username}
                      qd={item.quadra}
                      lt={item.lote}
                      date={item.data}
                      timer={item.hora}
                      demarcador={item.demarcador}
                      status={item.status}
                    />
                  </li>
                ))}
              </ul>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="Demarcado">
            <ScrollArea>
              <ul className="flex gap-3 ">
                {demarcacaoFiltradaDemarcado.map((item, id) => (
                  <li
                    key={id}
                    className={` rounded-md mb-3  flex flex-col min-w-80 h-min `}
                  >
                    <CardItem
                      user={item.username}
                      qd={item.quadra}
                      lt={item.lote}
                      date={item.data}
                      timer={item.hora}
                      demarcador={item.demarcador}
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
