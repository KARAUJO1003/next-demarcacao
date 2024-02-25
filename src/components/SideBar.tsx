import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import LogoDark02 from '@/assets/logo02dark.png'
import LogoLight02 from '@/assets/logo02light.png'
import Image from "next/image";
import { Button } from "./ui/button";
import { CircleUserRound, HomeIcon, LogIn, LogOut, UsersRound } from "lucide-react";
import { useTheme } from "next-themes";
const SideBar = (): JSX.Element => {

  const { theme } = useTheme()

  return (
    <div className="prose dark:prose-invert border-r w-[300px] py-10 px-5 flex flex-col justify-between  h-screen fixed">
      <div className="w-[200px] h-[50px] flex items-center justify-center">
        <Image loading="eager" alt="logo" src={theme === 'dark' ? LogoDark02 : LogoLight02} height={50} width={200} />
      </div>

      <div className="flex flex-col h-full mt-12 gap-4 items-start justify-start">
        <Button variant={'outline'} className="w-full justify-start bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"><Link className="no-underline flex items-center gap-2" href="/portal"><HomeIcon size={16}/>Pagina Inicial</Link></Button>
        <Button variant={'outline'} className="w-full justify-start bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"><Link className="no-underline flex items-center gap-2" href="/portal/login"> <LogIn  size={16}/>Login</Link></Button>
        <Button variant={'outline'} className="w-full justify-start bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"><Link className="no-underline flex items-center gap-2" href="/portal/cadastro"><CircleUserRound  size={16}/>Pessoas</Link></Button>
        <Button variant={'outline'} className="w-full justify-start bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"><Link className="no-underline flex items-center gap-2" href="/users"><UsersRound  size={16}/>Usuários</Link></Button>
      </div>

      <div className="w-full flex items-center justify-between">
        <ModeToggle />
        <Button variant={'outline'} className="flex gap-2">
          <LogOut size={16} />
          <Link href='/api/logout' className="no-underline"> Sair</Link>
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
