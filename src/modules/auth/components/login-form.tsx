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

export function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Faça seu login para continuar.</CardDescription>
      </CardHeader>
      <form action={AuthActions.login}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                id="email"
                placeholder="Digite um email válido"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            className="bg-emerald-600 text-zinc-50 hover:bg-emerald-500"
            type="submit"
          >
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
