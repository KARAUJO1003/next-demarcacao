"use client";
import { useEffect, useState } from "react";
import { Bookings } from "../../../../prisma/generated/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TagBadge } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader, Save } from "lucide-react";
import InputMask from "react-input-mask";

async function getData(): Promise<Bookings[]> {
  const res = await fetch("/api/bookings");
  if (!res.ok) {
    // Isso ativará o Error Boundary mais próximo em 'error.js'
    throw new Error("Falha ao buscar dados");
  }
  const rawData = await res.json();
  console.log("Dados brutos da API:", rawData);

  return rawData;
}

const schema = z.object({
  id: z.string(),
  empresa: z.string(),
  cliente: z.string(),
  quadra: z.string(),
  lote: z.string(),
  status: z.string(),
  dt_agendamento: z.string(),
  horario_do_agen: z.string(),
});

export default function PageUser({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<Bookings | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (params.id) {
      setValue("id", params.id as string); // Define o valor do campo ID como o valor recebido via parâmetro da rota
    }
  }, [params.id, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const bookingWithId = data.find(
          (item: Bookings) => item.id === params.id
        );
        if (bookingWithId !== undefined) {
          setBooking(bookingWithId);
        } else {
          console.error("Booking com ID não encontrado:", params.id);
        }
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };
    fetchData();
  }, [params.id]);

  const onSubmit = async (data: any) => {
    // Enviar dados atualizados para a rota PUT
    console.log(data);

    try {
      setIsLoading(true);
      const response = await fetch(`/api/bookings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Produto atualizado com sucesso, redirecionar para a página de detalhes do produto
        //router.push(`/products/${params.id}`);
        setIsLoading(false);
        console.log("dados recebidos com sucesso");
        toast("Cliente editado com sucesso", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        });
      } else {
        // Lidar com erros
        console.log("Dados não atualizados");
      }
    } catch (error) {
      // Lidar com erros de rede
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {booking && (
        <Card className="max-w-[500px] min-w-[400px]">
          <CardContent className="space-y-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                className=" my-5"
                defaultValue={booking.cliente ?? ""}
                {...register("cliente")}
              />

              <div className="">
                <div className="col-span-3 space-y-2">
                  <div className=" items-center min-w-full grid grid-cols-4 gap-3">
                    <CardDescription className="w-full flex justify-end">
                      Status
                    </CardDescription>
                    <Select
                      defaultValue={booking.status ?? ""}
                      onValueChange={(selectedValue) =>
                        setValue("status", selectedValue)
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione algo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup {...register("status")}>
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
                  </div>
                  <div className=" items-center min-w-full grid grid-cols-4 gap-3">
                    <Input
                      className="hidden"
                      defaultValue={booking.id ?? ""}
                      value={booking.id ?? ""}
                    />
                  </div>
                  <div className=" items-center min-w-full grid grid-cols-4 gap-3">
                    <CardDescription className="w-full flex justify-end">
                      Empresa
                    </CardDescription>
                    <Select
                      defaultValue={booking.empresa ?? ""}
                      onValueChange={(selectedValue) =>
                        setValue("empresa", selectedValue)
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione algo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup {...register("empresa")}>
                          <SelectItem value="VALLE DO ACAI">
                            Valle do Açaí
                          </SelectItem>
                          <SelectItem value="PARK JARDINS">
                            Park Jardins
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className=" items-center min-w-full grid grid-cols-4 gap-3">
                    <CardDescription className="w-full flex justify-end">
                      Quadra
                    </CardDescription>
                    <InputMask
                      className=" col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      mask={"99"}
                      maskChar={""}
                      alwaysShowMask={true}
                      defaultValue={booking.quadra ?? ""}
                      {...register("quadra")}
                    />
                  </div>
                  <div className=" items-center min-w-full grid grid-cols-4 gap-3">
                    <CardDescription className="w-full flex justify-end">
                      Lote
                    </CardDescription>
                    <InputMask
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      mask={"99"}
                      maskChar={""}
                      alwaysShowMask={true}
                      defaultValue={booking.lote ?? ""}
                      {...register("lote")}
                    />
                  </div>
                  <div className=" items-center min-w-full grid grid-cols-4 gap-3">
                    <CardDescription className="w-full flex justify-end">
                      Data
                    </CardDescription>
                    <Input
                      type="date"
                      className="col-span-3"
                      defaultValue={booking.dt_agendamento ?? ""}
                      {...register("dt_agendamento")}
                    />
                  </div>
                  <div className=" items-center min-w-full grid grid-cols-4 gap-3">
                    <CardDescription className="w-full flex justify-end">
                      Hora
                    </CardDescription>
                    <Input
                      type="time"
                      className="col-span-3"
                      defaultValue={booking.horario_do_agen ?? ""}
                      {...register("horario_do_agen")}
                    />
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-between mt-10 px-0">
                <Button variant={"outline"}>
                  <Link href={"/"}>Voltar</Link>
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-zinc-200"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader size={14} className="animate-spin" /> Gravando
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Save size={14} /> Gravar
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
