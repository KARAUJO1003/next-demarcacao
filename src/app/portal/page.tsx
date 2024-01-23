import Image from "next/image";
import LogoDark01 from "@/assets/logo01dark.png";
import LogoDark03 from "@/assets/logo03dark.png";
import LogoLight03 from "@/assets/logo03light.png";
import Link from "next/link";
import LoginPage from "./login/page";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalPage() {



  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <Link href="/portal/login">
        <div className="w-[400px]  overflow-hidden flex flex-col items-center justify-center">
          <Image
            loading="eager"
            alt="logo"
            src={ LogoDark01}
            height={100}
            width={300}
            />
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-zinc-50 flex items-center gap-2 absolute top-10 right-10">Fazer login <LogIn /></Button>
        </div>
      </Link>
    </div>
  );
}
