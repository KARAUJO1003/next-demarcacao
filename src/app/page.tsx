"use client";

import { AgendaItem, Demarcacao } from "@/app/ag";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Modal } from "@/components/Modal";
import TableItens from "@/components/TableItens";
import CardItem from "@/components/CardItem";
import SideBar from "@/components/SideBar";
import { columns } from "@/components/TableItens";
import { data } from "@/components/TableItens";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home({ data }: AgendaItem) {
  const [exibirAgendadas, setExibirAgendadas] = useState(true);
  const [exibirDemarcadas, setExibirDemarcadas] = useState(true);
  const [demarcacao, setDemarcacao] = useState<AgendaItem[]>([
    {
      username: "Kaesyo",
      quadra: "00",
      lote: "00",
      data: "2024-01-18",
      hora: "17:00",
      demarcador: "Mauro",
      status: "Agendado",
    },
    {
      username: "Kaesyo",
      quadra: "00",
      lote: "00",
      data: "2024-01-18",
      hora: "17:00",
      demarcador: "Mauro",
      status: "Demarcado",
    },
    {
      username: "Kaesyo",
      quadra: "00",
      lote: "00",
      data: "2024-01-18",
      hora: "17:00",
      demarcador: "Mauro",
      status: "Agendado",
    },
    {
      username: "Kaesyo",
      quadra: "00",
      lote: "00",
      data: "2024-01-18",
      hora: "17:00",
      demarcador: "Mauro",
      status: "Demarcado",
    },
  ]);

  const handleTabChange = (value: any) => {
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
    console.log(data);
  };

  return (
    <main className=" min-h-screen w-full  grid grid-cols-[200px_minmax(900px,_1fr)]">
      <div className="overflow-x-hidden">
        <SideBar />
      </div>
      <div className="max-h-screen ">
        <Tabs
          defaultValue="Agendado"
          onValueChange={handleTabChange}
          className="w-full py-10 px-5 "
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
              <ul className="flex gap-3 min-h-64 items-center rounded-md border">
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
              <ul className="flex gap-3 min-h-64 rounded-md border">
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

          <Table>
            <TableHeader>
              <TableHead>Cliente</TableHead>
              <TableHead>Quadra</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Demarcador</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Status</TableHead>
            </TableHeader>

            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="w-full">
                <TableBody className="w-full">
                  {demarcacaoFiltrada.map((item) => (
                    <TableRow>
                      <TableCell>{item.username}</TableCell>
                      <TableCell>{item.quadra}</TableCell>
                      <TableCell>{item.lote}</TableCell>
                      <TableCell>{item.demarcador}</TableCell>
                      <TableCell>{item.data}</TableCell>
                      <TableCell>{item.hora}</TableCell>
                      <TableCell>
                        <span
                          className={` p-1 px-2 rounded text-xs ${
                            item.status === "Agendado"
                              ? "bg-orange-500 text-orange-200"
                              : "bg-green-500 text-green-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </div>
            </ScrollArea>
            <TableFooter></TableFooter>
          </Table>
        </Tabs>
      </div>
    </main>
  );
}
("");
