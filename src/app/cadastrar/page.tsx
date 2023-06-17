import { SignupFormComponent } from "@/components/signupForm";

export const metadata = {
  title: "Reading - Cadastrar",
  description: "Sua estante de livros!",
}

export default function Page() {
  return (
    <div className="w-full flex-1 flex px-4 py-11 gap-7">
      <div className="w-full max-w-xs flex items-start justify-start">
        <SignupFormComponent />
      </div>
    </div>
  )
}