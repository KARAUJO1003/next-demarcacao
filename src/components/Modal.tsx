"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import * as z from "zod";
import InputMask from "react-input-mask";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { TagBadge } from "./TagBadge";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const formSchema = z.object({
  id: z.string(),
  cliente: z.string().min(2, {
    message: "Minimo 2 caracteres",
  }),
  quadra: z
    .string()
    .min(1, {
      message: "Minimo 2 caracteres",
    })
    .max(2),
  lote: z
    .string()
    .min(1, {
      message: "Minimo 2 caracteres",
    })
    .max(2, {
      message: "Máximo 2 caracteres",
    }),
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

export function Modal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [toggleCpf, setToggleCpf] = useState("");
  const [tabValue, setTabValue] = useState();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cliente: "",
      quadra: "",
      lote: "",
      dt_agendamento: "",
      horario_do_agen: "",
      status: "Agendado",
      demarcador: "Mauro",
      empresa: "Valle do Acai",
      cpf_cnpj: "",
      status_da_venda: "Ativa",
      benfeitoria: "Nao",
      resp_pelo_agendamento: "",
      obs: "",
    },
  });

  const { handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = form.getValues();

    try {
      setLoading(true);
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        toast("Cliente cadastrado com sucesso!");
        reset(); // Resetar o formulário após o envio bem-sucedido
      } else {
        setError("Erro ao criar registro. Por favor, tente novamente.");
      }
    } catch (error) {
      toast("Erro ao criar registro. Por favor, tente novamente.");
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-emerald-600 rounded-md px-3 py-2 text-sm font-semibold text-zinc-100 transition-all hover:bg-emerald-500">
        <span className="flex items-center">
          <Plus size={19} /> Novo registro
        </span>
      </DialogTrigger>
      <DialogContent className="min-h-[500px]">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col justify-between"
          >
            <Tabs onValueChange={(e: any) => setTabValue(e)}>
              <TabsList>
                <TabsTrigger value="tab1">Agendamento</TabsTrigger>
                <TabsTrigger value="tab2">Mais informações</TabsTrigger>
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
                          required
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
                        <div className="flex flex-col items-center justify-center gap-1">
                          <RadioGroup
                            defaultValue="CPF"
                            onValueChange={(e) => setToggleCpf(e)}
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id="CPF" value="CPF" />
                              <Label htmlFor="CPF">CPF</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem id="CNPJ" value="CNPJ" />
                              <Label htmlFor="CNPJ">CNPJ</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <InputMask
                          className=" col-span-3 flex h-10 w-3/4 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          mask={
                            toggleCpf === "CPF"
                              ? "999.999.999-99"
                              : "99.999.999/9999-99"
                          }
                          required
                          maskChar={"-"}
                          alwaysShowMask={true}
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
                          required
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
                          required
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
                        <InputMask
                          className=" col-span-3 flex h-10 w-3/4 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          mask={"99"}
                          required
                          maskChar={"-"}
                          alwaysShowMask={true}
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
                        <InputMask
                          className=" col-span-3 flex h-10 w-3/4 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          mask={"99"}
                          required
                          maskChar={"-"}
                          alwaysShowMask={true}
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
                          defaultValue="Agendado"
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
                                <TagBadge
                                  nometag={"Agendado"}
                                  filtertag={"Agendado"}
                                />
                              </SelectItem>
                              <SelectItem value="Demarcado">
                                <TagBadge
                                  nometag={"Demarcado"}
                                  filtertag={"Demarcado"}
                                />
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
                        <Select defaultValue="VALLE DO ACAI">
                          <SelectTrigger className="w-3/4">
                            <SelectValue placeholder="Selecione algo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup {...field}>
                              <SelectItem value="VALLE DO ACAI">
                                Valle do Açaí
                              </SelectItem>
                              <SelectItem value="PARK JARDINS">
                                Park Jardins
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                        Agente
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
                        <Select defaultValue="Nao">
                          <SelectTrigger className="w-3/4 300px]">
                            <SelectValue placeholder="Selecione algo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup {...field}>
                              <SelectItem value="Sim">Sim</SelectItem>
                              <SelectItem value="Nao">Não</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                        <Select
                          defaultValue="Ativa"
                          value={form.getValues("status_da_venda")}
                        >
                          <SelectTrigger className="w-3/4 300px]">
                            <SelectValue placeholder="Selecione algo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup {...field}>
                              <SelectItem value="Ativa">Ativa</SelectItem>
                              <SelectItem value="Cancelada">
                                Cancelada
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                  name="obs"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-5">
                      <FormLabel className="w-1/4 flex justify-start">
                        Observação
                      </FormLabel>
                      <FormControl>
                        <Textarea
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
              <DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                Cancelar
              </DialogClose>
              <Button
                className="bg-emerald-600 hover:bg-emerald-500 text-zinc-200"
                type="submit"
                disabled={loading || tabValue == "tab1" ? true : false}
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
