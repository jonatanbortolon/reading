import { EditBookFormComponent } from "@/components/editBookForm";
import { BreadcumbComponent } from "@/components/breadcumb";
import { Metadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const host = headers().get("host");

  const book = await fetch(`http://${host}/api/book/${id}`, {
    headers: headers(),
  }).then((res) => res.json());

  return {
    title: `Reading - Editar ${book.payload.title}`,
    description: "Sua estante de livros!",
  }
}

export default async function Page({ params: { id } }: Props) {
  const host = headers().get("host");
  const book = await fetch(`http://${host}/api/book/${id}`, {
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
