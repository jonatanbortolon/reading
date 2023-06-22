"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { ButtonComponent } from "../button";
import { InputComponent } from "../input";
import { RatingInputComponent } from "../ratingInput";
import { TextAreaInputComponent } from "../textAreaInput";
import Image from "next/image";
import { DateInputComponent } from "../dateInput";
import { ArrayInputComponent } from "../arrayInput";
import { useState } from "react";

type Props = {
  initialValues: {
    id: string;
    authors: Array<string>;
    title: string;
    coverUrl: string;
    rating: number;
    pageCount: number;
    review?: string;
    startedAt: string;
    finishedAt?: string;
  };
}

export function EditBookFormComponent({ initialValues }: Props) {
  const router = useRouter();
  const [isRemoveLoading, setIsRemoveLoading]= useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { 
      errors,
      isSubmitting,
    },
  } = useForm<{
    authors: Array<string>;
    title: string;
    coverUrl: string;
    rating: number;
    pageCount: number;
    review: string;
    startedAt: Date;
    finishedAt: Date | null;
  }>({
    resolver: zodResolver(z.object({
      authors: z.array(z.string(), {
        invalid_type_error: "Autor(es) inválido(s)",
        required_error: "É obrigatório o livro ter pelo menos 1 autor",
      }).min(1, {
        message: "O livro tem que ter pelo menos 1 autor"
      }).default([]),
      title: z.string({
        invalid_type_error: "Título inválido",
        required_error: "O título é obrigatório",
      }).nonempty({
        message: "O título é obrigatório",
      }),
      coverUrl: z.string({
        invalid_type_error: "Link da imagem inválido",
        required_error: "O link da imagem é obrigatório",
      }).nonempty({
        message: "O link da imagem é obrigatório",
      }).url({
        message: "Link da imagem inválido",
      }),
      rating: z.number({
        invalid_type_error: "Avaliação inválida",
        required_error: "A avaliação é obrigatória",
      }).int({
        message: "Avaliação inválida",
      }).min(0, {
        message: "Avaliação inválida",
      }).max(5, {
        message: "Avaliação inválida",
      }),
      pageCount: z.number({
        invalid_type_error: "Numero de páginas inválido",
        required_error: "O numero de páginas é obrigatório",
      }).min(1, {
        message: "Numero de páginas inválido",
      }),
      review: z.string({
        invalid_type_error: "Resenha inválida",
      }).optional().default(""),
      startedAt: z.date({
        invalid_type_error: "Data de começo da leitura inválida",
        required_error: "A data de começo da leitura é obrigatória",
      }),
      finishedAt: z.date({
        invalid_type_error: "Data de término da leitura inválida",
        required_error: "A data de término da leitura é obrigatória",
      }).nullable().default(null),
    })),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: async () => {
      const initialValuesClone = {
        ...structuredClone(initialValues),
        review: initialValues.review ?? "",
        startedAt: new Date(initialValues.startedAt),
        finishedAt: initialValues.finishedAt ? new Date(initialValues.finishedAt) : null,
      };

      return initialValuesClone;
    },
    shouldUnregister: false,
  })
  
  const onSubmit = handleSubmit(async ({
    authors,
    coverUrl,
    finishedAt,
    pageCount,
    rating,
    review,
    startedAt,
    title,
  }) => {
    try {
      const result = await fetch(`${window.location.protocol}//${window.location.host}/api/book/${initialValues.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          authors,
          coverUrl,
          finishedAt,
          pageCount,
          rating,
          review,
          startedAt,
          title,
        })
      }).then((res) => res.json());

      if (!result.success) {
        if (result.payload.message) {
          return toast.error(result.payload.message);
        }

        return toast.error("Algo deu errado, verifique as informações e tente novamente");
      }
      
      router.push("/");
    } catch (error) {
      
      toast.error("Algo deu errado, verifique as informações e tente novamente");
    }
  });

  async function onRemoveBookClick() {
    try {
      setIsRemoveLoading(true);

      const result = await fetch(`${window.location.protocol}//${window.location.host}/api/book/${initialValues.id}`, {
        method: 'DELETE',
      }).then((res) => res.json());

      if (!result.success) {
        if (result.payload.message) {
          return toast.error(result.payload.message);
        }

        return toast.error("Algo deu errado, tente novamente mais tarde");
      }
      
      router.push("/");
    } catch (error) {
      
      toast.error("Algo deu errado, tente novamente mais tarde");
    } finally {
      setIsRemoveLoading(false);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start mt-5">
        <div className="w-full flex items-start justify-start">
          <div className="max-w-[192px] flex-1 flex flex-col">
            <div className="w-full flex mb-2">
              <label className="w-full flex flex-col items-start text-sm font-bold">
                Link da imagem
                <InputComponent className="w-full" placeholder="Link da imagem" error={errors.coverUrl?.message} {...register("coverUrl")}/>
              </label>
            </div>
            {watch("coverUrl") ? (
              <Image className="w-48 aspect-book-cover" width={150} height={200} src={watch("coverUrl")} alt={`Capa ${watch("title")}`} />
            ) : null}
          </div>
          <div className="flex-1 flex flex-col ml-4">
            <div className="w-full flex">
              <label className="w-full flex flex-col items-start text-sm font-bold">
                <span className="w-full max-w-[100px]">Título</span>
                <InputComponent className="w-full" error={errors.title?.message} {...register("title")} />
              </label>
            </div>
            <div className="w-full flex mt-4">
              <label className="w-full flex flex-col items-start text-sm font-bold">
                <span className="w-full max-w-[100px]">Autores</span>
                <Controller
                    name="authors"
                    control={control}
                    render={({field: {onChange,value}, fieldState: {error}}) => {
                      return (
                        <ArrayInputComponent className="w-full" emptyMessage="Adicione um autor" valueMessage={`${value?.length ?? 0} ${(value?.length ?? 0) === 1 ? "autor" : "autores"}`} error={error?.message} values={value} onChange={(onChange)}/>
                      )
                    }}
                  />
              </label>
            </div>
            <div className="w-full flex mt-4">
              <label className="w-full flex flex-col items-start text-sm font-bold">
                <span className="w-full max-w-[100px]">Páginas</span>
                <InputComponent className="w-full" error={errors.pageCount?.message} {...register("pageCount")} />
              </label>
            </div>
            <div className="w-full flex mt-4">
              <label className="w-full flex flex-col items-start text-sm font-bold">
                <span className="w-full max-w-[100px]">Comecei a ler</span>
                <Controller
                  name="startedAt"
                  control={control}
                  render={({field: {onChange,value}, fieldState: {error}}) => {
                    return (
                      <DateInputComponent className="w-full" error={error?.message} selected={value} onChange={onChange} />
                    )
                  }}
                />
              </label>
            </div>
            <div className="w-full flex mt-4">
              <label className="w-full flex flex-col items-start text-sm font-bold">
                <span className="w-full max-w-[100px]">Terminei de ler</span>
                <Controller
                  name="finishedAt"
                  control={control}
                  render={({field: {onChange,value}, fieldState: {error}}) => {
                    return (
                      <DateInputComponent className="w-full" error={error?.message} selected={value} onChange={onChange} />
                    )
                  }}
                />
              </label>
            </div>
            <div className="w-full flex mt-4">
              <label className="w-full flex flex-col items-start text-sm font-bold">
                Sua avaliação
                <Controller
                  name="rating"
                  control={control}
                  render={({ field: {onChange,value}, fieldState: {error} }) => {
                    return (
                      <RatingInputComponent error={error?.message} initialValue={value} onChange={onChange} />
                    )
                  }}
                />
              </label>
            </div>
            <div className="w-full flex flex-col mt-5">
              <span className="text-lg">Escreva uma resenha</span>
              <span className="text-xs font-bold mt-2">Resenha</span>
              <TextAreaInputComponent className="mt-2" placeholder="Escrever" error={errors.review?.message} {...register("review")} />
            </div>
            <div className="w-full max-w-[240px] mt-4">
              <ButtonComponent className="w-full" isLoading={isSubmitting} onClick={onSubmit}>Atualizar</ButtonComponent>
            </div>
            <div className="w-full max-w-[240px] mt-2">
              <ButtonComponent className="w-full bg-red-500" isLoading={isRemoveLoading} onClick={onRemoveBookClick}>Remover</ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}