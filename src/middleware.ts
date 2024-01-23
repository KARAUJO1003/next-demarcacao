import { NextRequest, NextResponse } from "next/server";
import AuthService from "./modules/auth/services/auth-service";

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

const publicRoutes = ['/portal' , '/portal/login', '/portal/cadastro']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (publicRoutes.includes(pathname)){
    return NextResponse.next()
  }

  const session = await AuthService.isSessionValid()
  if (!session) {
    return NextResponse.redirect(new URL("/portal", req.url));
  }

  return NextResponse.next();
}
