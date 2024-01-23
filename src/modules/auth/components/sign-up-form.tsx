import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthActions from "../actions/auth-actions";
import Link from "next/link";

export function SignUpForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Cadastro</CardTitle>
        <CardDescription>Preencha seus dados no formulário abaixo</CardDescription>
      </CardHeader>
      <form action={AuthActions.createAccount}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" placeholder="Digite seu nome" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                placeholder="Digite um e-mail válido"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        <Button variant="outline">
            <Link href="/portal/login">Ja tenho uma conta</Link>
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-zinc-50" type="submit">
            Cadastrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
