export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/((?!cadastrar|entrar|api|_next/static|_next/image|favicon.ico|globals.css).*)"],
};