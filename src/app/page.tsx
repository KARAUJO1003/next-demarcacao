"use client";
import Image from "next/image";
import { Demarcacao } from "@/app/ag";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  const [exibirAgendadas, setExibirAgendadas] = useState(true);
  const [exibirDemarcadas, setExibirDemarcadas] = useState(true);

  const handleTabChange = (value: any) => {
    // Atualize o estado de exibição com base na guia selecionada
    setExibirAgendadas(value === "Agendada");
    setExibirDemarcadas(value === "Demarcado");
  };

  const demarcacaoFiltrada = Demarcacao.filter((item) => {
    return (
      (exibirAgendadas && item.Status === "Agendada") ||
      (exibirDemarcadas && item.Status === "Demarcado")
    );
  });

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <Tabs
        defaultValue="Agendada"
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full items-center justify-start">
          <TabsTrigger value="Agendada">Agendada</TabsTrigger>
          <TabsTrigger value="Demarcado">Demarcado</TabsTrigger>
          <NewDemarc />
        </TabsList>
        <TabsContent value="Agendada">
          <ScrollArea>
            <ul className="flex gap-3 ">
              {demarcacaoFiltrada.map((item, id) => (
                <li
                  key={id}
                  className={`bg-zinc-200 rounded-md mb-3 p-10 h-90 flex flex-col min-w-80 h-80 `}
                >
                  <p>Demarcador: {item.Demarcador}</p>
                  <p>Quadra: {item.Quadra}</p>
                  <p>Lote: {item.Lote}</p>
                  <p>DtaAgend: {item.DtaAgend}</p>
                  <p>HoraAgend: {item.HoraAgend}</p>
                  <p>User: {item.User}</p>
                  <p
                    className={`p-1 text-xs font-semibold rounded flex items-center ${
                      item.Status === "Agendada"
                        ? "bg-orange-600  text-orange-300"
                        : "bg-green-600  text-green-300"
                    } justify-center`}
                  >
                    {item.Status}
                  </p>
                </li>
              ))}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="Demarcado">
          <ScrollArea>
            <ul className="flex gap-3 ">
              {demarcacaoFiltrada.map((item, id) => (
                <li
                  key={id}
                  className={`bg-zinc-200 rounded-md mb-3 p-10 h-90 flex flex-col min-w-80 h-80 `}
                >
                  <p>Demarcador: {item.Demarcador}</p>
                  <p>Quadra: {item.Quadra}</p>
                  <p>Lote: {item.Lote}</p>
                  <p>DtaAgend: {item.DtaAgend}</p>
                  <p>HoraAgend: {item.HoraAgend}</p>
                  <p>User: {item.User}</p>
                  <p
                    className={`p-1 text-xs font-semibold rounded flex items-center ${
                      item.Status === "Agendada"
                        ? "bg-orange-600  text-orange-300"
                        : "bg-green-600  text-green-300"
                    } justify-center`}
                  >
                    {item.Status}
                  </p>
                </li>
              ))}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </main>
  );
}
