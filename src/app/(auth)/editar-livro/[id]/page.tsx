import { EditBookFormComponent } from "@/components/editBookForm";
import { BreadcumbComponent } from "@/components/breadcumb";
import { Metadata } from "next";
import { headers } from "next/headers";
import { GetBookResponse } from "@/types/getBookResponse";
import { ApiResponse } from "@/types/apiResponse";

type Props = {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const host = headers().get("host");

  const bookResponse = await fetch(`http://${host}/api/book/${id}`, {
    headers: headers(),
  });

  if (bookResponse.status === 404) {
    return {
      title: "Reading - Livro não encontrado",
      description: "Sua estante de livros!",
    } 
  }

  const book: ApiResponse<GetBookResponse> = await bookResponse.json();

  if (!book.success) {
    return {
      title: "Reading - Algo deu errado",
      description: "Sua estante de livros!",
    } 
  }

  return {
    title: `Reading - Editar ${book.payload.title}`,
    description: "Sua estante de livros!",
  }
}

export default async function Page({ params: { id } }: Props) {
  const host = headers().get("host");
  const book: ApiResponse<GetBookResponse> = await fetch(`http://${host}/api/book/${id}`, {
    headers: headers(),
    next: {
      tags: [`book.${id}`]
    },
  }).then((res) => res.json());

  return (
    <div className="w-full flex-1 flex px-4 py-11">
      <div className="w-full max-w-xl flex flex-col">
        <BreadcumbComponent className="mb-2" paths={["Meus livros", "Editar livro"]} />
        {book.success ? (
          <EditBookFormComponent initialValues={book.payload}/>
        ) : (
          <div className="w-full items-center justify-center">
            <span className="text-xl text-dark-gray-500">Livro não encontrado!</span>
          </div>
        )}
      </div>
    </div>
  )
}
