"use client";

import { useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { TagBadge } from ".";

// Define o esquema para os dados do formulário
const formSchema = z.object({
  id: z.string().optional(),
  cliente: z.string().min(2),
  status: z.string(),
  // Adicione outras propriedades conforme necessário
});

interface ModalProps {
  initialData?: FormData;
}
interface FormData {
  id?: string;
  cliente: string;
  status: string;
  // Adicione outras propriedades conforme necessário
}

// Imports omitidos por brevidade

export function EditBooking({ initialData }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit, reset, control, formState, getValues, setValue } =
    useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        cliente: initialData?.cliente || "kaesyo",
        status: initialData?.status || "Agendado",
      },
    });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = getValues();

    try {
      setLoading(true);
      let url = "/api/bookings";
      let method: "POST" | "PUT" = "POST";

      if (formData.id) {
        url += `/${formData.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        reset();
      } else {
        setError("Erro ao salvar. Por favor, tente novamente.");
      }
    } catch (error) {
      setError("Erro ao salvar. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="cliente"
              defaultValue={form.getValues("cliente")}
              render={({ field }) => (
                <FormItem className="flex items-center justify-end gap-5">
                  <FormLabel className="w-1/4 flex justify-start">
                    Cliente
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome completo"
                      className="w-3/4 300px"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="status"
              defaultValue={form.getValues("status")}
              render={({ field }) => (
                <FormItem className="flex items-center justify-end gap-5">
                  <FormLabel className="w-1/4 flex justify-start">
                    Status
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={getValues("status")}
                      onValueChange={(selectedValue) =>
                        setValue("status", selectedValue)
                      }
                    >
                      <SelectTrigger className="w-3/4 300px]">
                        <SelectValue placeholder="Selecione algo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup {...field}>
                          <SelectItem value="Agendado">
                            <TagBadge nometag={"Agendado"} filtertag={"Agendado"}/>
                          </SelectItem>
                          <SelectItem value="Demarcado">
                            <TagBadge nometag={"Demarcado"} filtertag={"Demarcado"}/>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Button
                className="bg-emerald-600 hover:bg-emerald-500 text-zinc-200"
                type="submit"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
