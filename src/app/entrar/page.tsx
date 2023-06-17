import { SigninFormComponent } from "@/components/signinForm";
import Link from "next/link";

export const metadata = {
  title: "Reading - Entrar",
  description: "Sua estante de livros!",
}

export default async function Page() {
  return (
    <div className="w-full flex-1 flex px-4 py-11 gap-7">
      <div className="w-full max-w-xs flex flex-col items-start justify-start">
        <SigninFormComponent />
        <Link className="font-bold mt-4 underline" href="/cadastrar">Cadastre-se agora!</Link>
      </div>
    </div>
  )
}