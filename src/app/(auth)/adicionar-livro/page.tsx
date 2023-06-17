import { AddBookFormComponent } from "@/components/addBookForm";
import { BreadcumbComponent } from "@/components/breadcumb";

export const metadata = {
  title: "Reading - Adicionar livro",
  description: "Sua estante de livros!",
}

export default function Page() {
  return (
    <div className="w-full flex-1 flex px-4 py-11">
      <div className="w-full max-w-xl flex flex-col">
        <BreadcumbComponent className="mb-2" paths={["Meus livros", "Adicionar livro"]} />
        <AddBookFormComponent />
      </div>
    </div>
  )
}
