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

const formSchema = z.object({
  id: z.string(),
  cliente: z.string().min(2),
  quadra: z.number().int().min(1).max(2),
  lote: z.number().int().min(1).max(2),
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
  idBookings: z.string()
});

type ProfileFormProps = {
  onAddItem: (newItem: Bookings) => void;
};

export function Modal({ onAddItem }: ProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cliente: "",
      quadra: 0,
      lote: 0,
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast("Item adicionado para a próxima " + values.dt_agendamento, {
      description: "Quadra " + values.quadra + " Lote " + values.lote,
      action: {
        label: "Fechar",
        onClick: () => console.log("Undo"),
      },
    });
    onAddItem(values);
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-emerald-600 rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 transition-all hover:bg-emerald-500">
        <span className="flex items-center">
          <Plus size={19} /> Add New
        </span>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cliente"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5">
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Usuário" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name="quadra"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-5">
                    <FormLabel>Quadra</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="quadra" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lote"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-5">
                    <FormLabel>Lote</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="lote" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="demarcador"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5">
                  <FormLabel>Demarcador</FormLabel>
                  <FormControl>
                    <Input placeholder="Demarcador" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={form.getValues("status")}
                      onValueChange={(selectedValue) =>
                        form.setValue("status", selectedValue)
                      }
                    >
                      <SelectTrigger>
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
            <div className="flex w-full items-center justify-center gap-3">
              <FormField
                control={form.control}
                name="dt_agendamento"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input lang="pt-BR" type="date" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="horario_do_agen"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Hora</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <DialogClose>
                <Button variant={"outline"}>Cancelar</Button>
              </DialogClose>
              <Button
                className="bg-emerald-600 hover:bg-emerald-500 text-zinc-200"
                type="submit"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
