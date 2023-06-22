import { BookShowcaseComponent } from "@/components/bookShowcase";
import { LinkButtonComponent } from "@/components/linkButton";
import { ApiResponse } from "@/types/apiResponse";
import { GetBooksResponse } from "@/types/getBooksResponse";
import { headers } from "next/headers";

export const metadata = {
  title: "Reading - Meus livros",
  description: "Sua estante de livros!",
}

export default async function Page() {
  const host = headers().get("host");
  const books: ApiResponse<GetBooksResponse> = await fetch(`http://${host}/api/book`, {
    headers: headers(),
    next: {
      tags: ["books"]
    },
  }).then((res) => res.json());

  return (
    <div className="w-full flex-1 flex px-4 py-11 gap-7">
      <div className="w-full max-w-[240px] flex items-start justify-start">
        <LinkButtonComponent className="w-full" href="/adicionar-livro">Adicionar livro</LinkButtonComponent>
      </div>
      <div className="w-full max-w-lg flex flex-col items-start justify-start">
        <div className="w-full flex items-start justify-start relative before:absolute before:w-full before:h-[1px] before:bg-light-gray-100 before:bottom-0">
          <div className="flex items-center justify-center ml-4 px-1 py-2 cursor-pointer relative before:absolute before:w-full before:h-[1px] before:rounded-t-md before:bg-secondary before:bottom-0">
            <span className="text-sm text-secondary">Lendo atualmente</span>
          </div>
        </div>
        <ul className="w-full flex flex-col mt-7 gap-7">
            {books.success ? (
              books.payload.length > 0 ? (
                books.payload.map((book) => {
                  return (
                    <BookShowcaseComponent key={`book-${book.id}`} book={book}/>
                  )
                })
              ) : (
                <div className="w-full items-center justify-center">
                  <span className="text-xl text-dark-gray-500">Você não tem nenhum livro cadastrado!</span>
                </div>
              )
            ) : (
              <div className="w-full items-center justify-center">
                <span className="text-xl text-dark-gray-500">Ocorreu um erro ao buscar seus livros!</span>
              </div>
            )}
          </ul>
      </div>
    </div>
  )
}
