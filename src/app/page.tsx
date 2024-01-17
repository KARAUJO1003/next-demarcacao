"use client";

import { AgendaItem, Demarcacao } from "@/app/ag";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProfileForm } from "@/components/AddNewItem";



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
    console.log(demarcacao)
    

  };

  return (



    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <Tabs
        defaultValue="Agendado"
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full border-b pb-2 bg-transparent items-center justify-between">
          <div>
            <TabsTrigger value="Agendado">Agendada</TabsTrigger>
            <TabsTrigger value="Demarcado">Demarcado</TabsTrigger>
          </div>
          <ProfileForm onAddItem={handleAddItem}/>
        </TabsList>
        <TabsContent value="Agendado">
          <ScrollArea>
            <ul className="flex gap-3 ">
              {demarcacaoFiltradaAgendada.map((item, id) => (
                <li
                  key={id}
                  className={`bg-zinc-200 rounded-md mb-3 p-10 h-90 flex flex-col min-w-80 h-80 `}
                >
                  <p>Demarcador: {item.demarcador}</p>
                  <p>Quadra: {item.quadra}</p>
                  <p>Lote: {item.lote}</p>
                  <p>DtaAgend: {item.data}</p>
                  <p>HoraAgend: {item.hora}</p>
                  <p>User: {item.username}</p>
                  <p
                    className={`p-1 text-xs font-semibold rounded flex items-center ${
                      item.status === "Agendado"
                        ? "bg-orange-600  text-orange-300"
                        : "bg-green-600  text-green-300"
                    } justify-center`}
                  >
                    {item.status}
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
              {demarcacaoFiltradaDemarcado.map((item, id) => (
                <li
                  key={id}
                  className={`bg-zinc-200 rounded-md mb-3 p-10 h-90 flex flex-col min-w-80 h-80 `}
                >
                  <p>Demarcador: {item.demarcador}</p>
                  <p>Quadra: {item.quadra}</p>
                  <p>Lote: {item.lote}</p>
                  <p>DtaAgend: {item.data}</p>
                  <p>HoraAgend: {item.hora}</p>
                  <p>User: {item.username}</p>
                  <p
                    className={`p-1 text-xs font-semibold rounded flex items-center ${
                      item.status === "Agendado"
                        ? "bg-orange-600  text-orange-300"
                        : "bg-green-600  text-green-300"
                    } justify-center`}
                  >
                    {item.status}
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
