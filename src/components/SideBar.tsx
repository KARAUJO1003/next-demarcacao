import Link from "next/link";
import { CalendarDemo } from "./Calendar-Date";
import { ModeToggle } from "./ModeToggle";
import LogoDark02  from '@/assets/logo02dark.png'
import Image from "next/image";
const SideBar = (): JSX.Element => {
  return (
    <div className="prose dark:prose-invert border-r w-[300px] py-10 px-5 flex flex-col justify-between  h-screen fixed">
      <div className="w-[200px] h-[50px] overflow-hidden flex items-center justify-center">
        
        <Image loading="eager" alt="logo" src={LogoDark02} height={50} width={200}/>
      </div>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <Link href="/portal/login">Login</Link>
        <Link href="/portal/cadastro">Cadastro</Link>
        <Link href="/portal">Portal</Link>
      </div>
    </div>
  );
};

export default SideBar;
