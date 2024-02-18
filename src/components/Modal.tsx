"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { AgendaItem } from "@/app/ag";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Bookings } from "../../prisma/generated/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";

const formSchema = z.object({
  id: z.string(),
  cliente: z.string().min(2),
  quadra: z.string().min(1).max(2),
  lote: z.string().min(1).max(2),
  dt_agendamento: z.string(),
  horario_do_agen: z.string(),
  status: z.string(),
  demarcador: z.string(),
  empresa: z.string(),
  cpf_cnpj: z.string(),
  status_da_venda: z.string(),
  benfeitoria: z.string(),
  resp_pelo_agendamento: z.string(),
  obs: z.string(),
  idBookings: z.string(),
});

type ProfileFormProps = {
  onAddItem: (newItem: Bookings) => void;
};

export function Modal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cliente: "",
      quadra: "",
      lote: "",
      dt_agendamento: "",
      horario_do_agen: "",
      status: "",
      demarcador: "",
      empresa: "",
      cpf_cnpj: "",
      status_da_venda: "",
      benfeitoria: "",
      resp_pelo_agendamento: "",
      obs: "",
    },
  });

  const handleSubmit = async (formData: Bookings) => {
    console.log('clicou no salvar')
    setLoading(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }
      setSuccess(true);
      // Lidar com a resposta do servidor
      const data = await response.json();
      console.log("Resposta do servidor:", data);
      // Exibir uma mensagem de sucesso
      toast.success("Dados enviados com sucesso!");
    } catch (error: any) {
      // Lidar com o erro caso ocorra
      console.error("Erro ao enviar dados:", error.message);
      // Exibir uma mensagem de erro para o usuário
      toast.error(
        "Erro ao enviar dados. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog>
      <DialogTrigger className="bg-emerald-600 rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 transition-all hover:bg-emerald-500">
        <span className="flex items-center">
          <Plus size={19} /> Add New
        </span>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <Tabs>
              <TabsList>
                <TabsTrigger value="tab1">Dados Cliente</TabsTrigger>
                <TabsTrigger value="tab2">Dados Empresa</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <FormField
                  control={form.control}
                  name="cliente"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Cliente
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome completo"
                          className="w-3/4 300px]"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf_cnpj"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        CPF/CNPJ
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CPF/CNPJ"
                          className="w-3/4 300px]"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dt_agendamento"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Data
                      </FormLabel>
                      <FormControl>
                        <Input
                          lang="pt-BR"
                          className="w-3/4 300px]"
                          type="date"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horario_do_agen"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Hora
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          className="w-3/4 300px]"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quadra"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Quadra
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-3/4 300px]"
                          type="text"
                          placeholder="Quadra"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lote"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Lote
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-3/4 300px]"
                          type="text"
                          placeholder="Lote"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="demarcador"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Demarcador
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-3/4 300px]"
                          placeholder="Demarcador"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={form.getValues("status")}
                          onValueChange={(selectedValue) =>
                            form.setValue("status", selectedValue)
                          }
                        >
                          <SelectTrigger className="w-3/4 300px]">
                            <SelectValue placeholder="Selecione algo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup {...field}>
                              <SelectItem value="Agendado">
                                <span className="flex items-center justify-center gap-3">
                                  <div className=" rounded-full bg-orange-500 w-3 h-3" />{" "}
                                  Agendado
                                </span>
                              </SelectItem>
                              <SelectItem value="Demarcado">
                                <span className="flex items-center justify-center gap-3">
                                  <div className=" rounded-full bg-green-500 w-3 h-3" />{" "}
                                  Demarcado
                                </span>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="tab2">
                <FormField
                  control={form.control}
                  name="empresa"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Empresa
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-3/4 300px]"
                          placeholder="Empresa"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resp_pelo_agendamento"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Resp. Agendamento
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-3/4 300px]"
                          placeholder="Responsável pelo agendamento"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="benfeitoria"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Benfeitoria
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-3/4 300px]"
                          placeholder="Benfeitoria"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status_da_venda"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Status da Venda
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-3/4 300px]"
                          placeholder="Status da  Venda"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="obs"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Observação
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-3/4 300px]"
                          placeholder="Observação"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between">
              <DialogClose>

                  Cancelar

              </DialogClose>
              <Button
                className="bg-emerald-600 hover:bg-emerald-500 text-zinc-200"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
