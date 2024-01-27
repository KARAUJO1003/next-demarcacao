import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import LogoDark02 from "@/assets/logo02dark.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
const SideBar = (): JSX.Element => {
  return (
    <div className="prose dark:prose-invert border-r w-[300px] py-10 px-5 flex flex-col justify-between  h-screen fixed">
      <div className="w-[200px] h-[50px] overflow-hidden flex items-center justify-center">
        <Image
          loading="eager"
          alt="logo"
          src={LogoDark02}
          height={50}
          width={200}
        />
      </div>
      <div className="flex flex-col h-full mt-12 gap-4 items-start justify-start">
        <Button
          variant={"secondary"}
          className="w-full justify-start text-zinc-400 hover:text-zinc-50"
        >
          <Link className="text-zinc-300 " href="/portal/login">
            Login
          </Link>
        </Button>
        <Button
          variant={"secondary"}
          className="w-full justify-start text-zinc-400 hover:text-zinc-50"
        >
          <Link className="text-zinc-300 " href="/portal/cadastro">
            Cadastro
          </Link>
        </Button>
        <Button
          variant={"secondary"}
          className="w-full justify-start text-zinc-400 hover:text-zinc-50"
        >
          <Link className="text-zinc-300 " href="/users">
            Usuários
          </Link>
        </Button>
        <Button
          variant={"secondary"}
          className="w-full justify-start text-zinc-400 hover:text-zinc-50"
        >
          <Link className="text-zinc-300 " href="/portal">
            Portal
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between w-full">
        <ModeToggle />
        <Button variant='outline'>
          <LogOut size={18} className="mr-2"/>
          <Link className="no-underline" href="/api/logout">Sair</Link>
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
