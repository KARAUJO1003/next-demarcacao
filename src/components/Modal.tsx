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
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AgendaItem, Demarcacao } from "@/app/ag";
import { useState } from "react";
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

const formSchema = z.object({
  username: z.string().min(2),
  quadra: z.string().min(2),
  lote: z.string().min(2),
  data: z.string(),
  hora: z.string(),
  status: z.string(),
  demarcador: z.string(),
});

type ProfileFormProps = {
  onAddItem: (newItem: AgendaItem) => void;
};

export function Modal({ onAddItem }: ProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "Kaesyo",
      quadra: "",
      lote: "",
      data: "",
      hora: "",
      demarcador: "Mauro",
      status: "Agendado",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast("Item adicionado para a próxima " + values.data, {
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
      <DialogTrigger className="bg-blue-500 rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 transition-all hover:bg-blue-700">
        <span className="flex items-center"><Plus size={19} /> Add New</span>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
                  <FormItem>
                    <FormLabel>Quadra</FormLabel>
                    <FormControl>
                      <Input placeholder="quadra" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lote</FormLabel>
                    <FormControl>
                      <Input placeholder="lote" {...field} />
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
                <FormItem>
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
                <FormItem>
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
                name="data"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data e Hora</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hora"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Adicionar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
