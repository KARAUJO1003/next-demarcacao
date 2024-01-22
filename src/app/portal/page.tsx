import Image from "next/image";
import LogoDark02 from "@/assets/logo02dark.png";
import LogoDark03 from "@/assets/logo03dark.png";
import LogoLight03 from "@/assets/logo03light.png";
import Link from "next/link";
import LoginPage from "./login/page";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";

export default function PortalPage() {



  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link href="/">
        <div className="w-[400px]  overflow-hidden flex flex-col items-center justify-center">
          <Image
            loading="eager"
            alt="logo"
            src={ LogoDark03}
            height={100}
            width={300}
            />
        </div>
      </Link>
    </div>
  );
}
