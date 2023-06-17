"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { BookSearchInputComponent, Data } from "../bookSearchInput";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonComponent } from "../button";
import { InputComponent } from "../input";
import { RatingInputComponent } from "../ratingInput";
import { TextAreaInputComponent } from "../textAreaInput";
import Image from "next/image";
import { DateInputComponent } from "../dateInput";
import { ArrayInputComponent } from "../arrayInput";

export function AddBookFormComponent() {
  const router = useRouter();
  const [isBookChosen, setIsBookChosen] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { 
      errors,
      isSubmitting
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
      }),
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
      }).int({
        message: "Numero de páginas inválido",
      }).min(0, {
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
      const result = await fetch(`${window.location.protocol}//${window.location.host}/api/book`, {
        method: 'POST',
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
    } catch (error: any) {
      toast.error("Algo deu errado, verifique as informações e tente novamente");
    }
  });

  function onBookSearchChange(book: Data | null) {
    if (!book) {
      return;
    }
    
    const {
      cover,
      title,
      authors,
      pageCount,
    } = book;
    
    reset({
      coverUrl: cover,
      title: title,
      pageCount: pageCount,
      authors: authors,
    });

    setIsBookChosen(true);
  }

  function onManualClick() {
    setIsManual(true);
  }

  return (
    <>
      <div className="w-full h-full fex flex-col items-start justify-start">
        <h3 className="text-2xl text-dark-gray-500">Adicionar livro</h3>
        <h3 className="font-semibold mt-8">Informe o nome do livro</h3>
        <BookSearchInputComponent
          className="w-full !mt-4"
          onSelect={onBookSearchChange}
        />
      </div>
      {isBookChosen ? (
        <div className="w-full flex flex-col items-start justify-start mt-5">
          {!isManual ? (
            <ButtonComponent className="p-0 bg-transparent mb-5" onClick={onManualClick}>
              <FontAwesomeIcon className="mx-2 text-primary" icon={faPlus}/> 
              <span className="text-primary">Preencher manualmente</span>
            </ButtonComponent>
          ) : null}
          <div className="w-full flex items-start justify-start">
            <div className="max-w-[192px] flex-1 flex flex-col">
              {isManual ? (
                <div className="w-full flex mb-2">
                  <label className="w-full flex flex-col items-start text-sm font-bold">
                    Link da imagem
                    <InputComponent className="w-full" placeholder="Link da imagem" error={errors.coverUrl?.message} {...register("coverUrl")}/>
                  </label>
                </div>
              ) : null}
              <Image className="w-48 aspect-book-cover" width={150} height={200} src={watch("coverUrl")} alt={`Capa ${watch("title")}`} />
            </div>
            <div className="flex-1 flex flex-col ml-4">
              {isManual ? (
                <div className="w-full flex mb-2">
                  <label className="w-full flex flex-col items-start text-sm font-bold">
                    Título
                    <InputComponent className="w-full" {...register('title')}/>
                  </label>
                </div>
              ) : (
                <span className="text-dark-gray-700 line-clamp-2">{watch("title")}</span>
              )}
              <div className="w-full flex items-center justify-between mt-2">
                {isManual ? (
                  <div className="w-full flex mb-2">
                    <label className="w-full flex flex-col items-start text-sm font-bold">
                      Autores
                      <Controller
                        name="authors"
                        control={control}
                        render={({field: {onChange,value}, fieldState: {error}}) => {
                          return (
                            <ArrayInputComponent className="w-full" emptyMessage="Adicione um autor" valueMessage={`${value.length} ${value.length === 1 ? "autor" : "autores"}`} error={error?.message} values={value} onChange={(onChange)}/>
                          )
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <span className="w-full text-secondary text-xs font-bold">{watch("authors").join(", ")}</span>
                )}
                {isManual ? (
                  <div className="w-full max-w-[120px] flex ml-2 mb-2">
                    <label className="w-full flex flex-col items-start text-sm font-bold">
                      Páginas
                      <InputComponent className="w-full" {...register('pageCount', {
                      valueAsNumber: true,
                    })}/>
                    </label>
                  </div>
                ) : (
                  <span className="text-secondary text-xs font-bold whitespace-nowrap ml-2">{watch("pageCount")} páginas
                  </span>
                )}
              </div>
              <div className="w-full flex mt-4">
                <label className="w-full flex items-center text-sm font-bold">
                  <span className="w-full max-w-[100px]">Comecei a ler:</span>
                  <Controller
                    name="startedAt"
                    control={control}
                    render={({ field: {onChange}, fieldState: {error} }) => {
                      return (
                        <DateInputComponent className="ml-10" error={error?.message} selected={watch("startedAt")} onChange={onChange}/>
                      )
                    }}
                  />
                </label>
              </div>
              <div className="w-full flex mt-4">
                <label className="w-full flex items-center text-sm font-bold">
                  <span className="w-full max-w-[100px]">Terminei de ler:</span>
                  <Controller
                    name="finishedAt"
                    control={control}
                    render={({ field: {onChange}, fieldState: {error} }) => {
                      return (
                        <DateInputComponent className="ml-10" error={error?.message} selected={watch("finishedAt")} onChange={onChange}/>
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
                    render={({ field: {onChange}, fieldState: {error} }) => {
                      return (
                        <RatingInputComponent error={error?.message} onChange={onChange} />
                      )
                    }}
                  />
                </label>
              </div>
              <div className="w-full flex flex-col mt-5">
                <span className="text-lg">Escreva uma resenha</span>
                <TextAreaInputComponent className="mt-1" placeholder="Escrever" error={errors.review?.message} {...register("review")} />
              </div>
              <div className="w-full max-w-[240px] mt-4">
                <ButtonComponent className="w-full" isLoading={isSubmitting} onClick={onSubmit}>Cadastrar</ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      ) :
        null
      }
    </>
  )
}