"use client"
import { ButtonComponent } from "@/components/button";
import { InputComponent } from "@/components/input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { signIn } from "next-auth/react"

export function SigninFormComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(z.object({
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

  const onSubmit = handleSubmit(async ({ email, password }) => {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          const error = JSON.parse(result.error);

          return toast.error(error.message);
        }

        router.push(`${window.location.protocol}//${window.location.host}`);
      } catch (error) {
        toast.error("Algo deu errado, verifique as informações e tente novamente");
      }
    }
  );

  return (
    <form className="w-full flex flex-col gap-2" onSubmit={onSubmit}>
      <label className="w-full flex flex-col items-start text-sm font-bold">
        E-mail
        <InputComponent className="w-full" {...register("email")} error={errors.email?.message} />
      </label>
      <label className="w-full flex flex-col items-start text-sm font-bold">
        Senha
        <InputComponent className="w-full" type="password" {...register("password")} error={errors.password?.message} />
      </label>
      <ButtonComponent type="submit" isLoading={isSubmitting}>
        Entrar
      </ButtonComponent>
    </form>
  )
}