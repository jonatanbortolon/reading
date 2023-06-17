"use client"
import { ButtonComponent } from "@/components/button";
import { InputComponent } from "@/components/input";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useRouter } from "next/navigation";

export function SignupFormComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm<{
    name: string;
    email: string;
    password: string;
  }>({
    resolver: zodResolver(z.object({
      name: z.string({
        invalid_type_error: "Nome inválido",
        required_error: "O nome é obrigatório",
      }),
      email: z.string({
        invalid_type_error: "E-mail inválido",
        required_error: "O e-mail é obrigatório",
      }).email({
        message: "E-mail inválido"
      }),
      password: z.string({
        invalid_type_error: "Senha inválida",
        required_error: "A senha é obrigatória",
      }).min(5, {
        message: "A senha tem que conter mais de 5 caracteres"
      })
    })),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
      try {
        const result = await fetch("api/auth/signup", {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password,
          })
        }).then((res) => res.json());

        if (!result.success) {
          if (result.payload.message) {
            return toast.error(result.payload.message);
          }

          return toast.error("Algo deu errado, verifique as informações e tente novamente");
        }
        
        router.push(`${window.location.protocol}//${window.location.host}/entrar`);
      } catch (error: any) {
        toast.error("Algo deu errado, verifique as informações e tente novamente");
      }
    }
  );

  return (
    <form className="w-full flex flex-col gap-2" onSubmit={onSubmit}>
      <label className="w-full flex flex-col items-start text-sm font-bold">
        Nome completo
        <InputComponent className="w-full" {...register("name")} error={errors.name?.message} />
      </label>
      <label className="w-full flex flex-col items-start text-sm font-bold">
        E-mail
        <InputComponent className="w-full" {...register("email")} error={errors.email?.message} />
      </label>
      <label className="w-full flex flex-col items-start text-sm font-bold">
        Senha
        <InputComponent className="w-full" type="password" {...register("password")} error={errors.password?.message} />
      </label>
      <ButtonComponent type="submit" isLoading={isSubmitting}>
        Cadastrar
      </ButtonComponent>
    </form>
  )
}