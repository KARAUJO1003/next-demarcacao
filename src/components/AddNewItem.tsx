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

export function ProfileForm({ onAddItem }: ProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      quadra: "",
      lote: "",
      data: "",
      hora: "",
      demarcador: "",
      status: "",
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
      <DialogTrigger className="bg-zinc-950 rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800">
        <p>Abrir modal</p>
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
                      onValueChange={(selectedValue) => form.setValue("status", selectedValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione algo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup {...field}>
                          <SelectItem value="Agendado">Agendado</SelectItem>
                          <SelectItem value="Demarcado">Demarcado</SelectItem>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
