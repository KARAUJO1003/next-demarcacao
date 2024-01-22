// auth-actions.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { NextRouter } from 'next/router';

const prisma = new PrismaClient();

export async function createAccount(event: React.FormEvent<HTMLFormElement>, router: NextRouter) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const formData = new FormData(event.currentTarget);
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!password) {
    // Tratar a ausência da senha (pode lançar um erro ou lidar de outra forma)
    throw new Error('A senha é obrigatória.');
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  router.push('/portal/login');
}

const AuthActions = {
  createAccount,
};

export default AuthActions;
