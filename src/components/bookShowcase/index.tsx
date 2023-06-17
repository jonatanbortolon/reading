"use client"
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { RatingInputComponent } from "../ratingInput";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

type Props = {
  book: {
    id: string;
    title: string;
    authors: Array<string>;
    rating: number;
    startedAt: string;
    coverUrl: string;
  }
}

export function BookShowcaseComponent({ book }: Props) {
  const router = useRouter();

  async function onRemoveBookClick() {
    try {
      const result = await fetch(`${window.location.protocol}//${window.location.host}/api/book/${book.id}`, {
        method: 'DELETE',
      }).then((res) => res.json());

      if (!result.success) {
        if (result.payload.message) {
          return toast.error(result.payload.message);
        }

        return toast.error("Algo deu errado, tente novamente mais tarde");
      }
      
      router.refresh();
    } catch (error) {
      
      toast.error("Algo deu errado, tente novamente mais tarde");
    }
  }

  return (
    <li className="flex relative rounded-sm hover:bg-slate-50 group">
      <Link className="w-full flex rounded-sm cursor-default" href={`/editar-livro/${book.id}`}>
        <Image className="aspect-book-cover" width={150} height={200} src={book.coverUrl} alt={`Capa ${book.title}`}/>
        <div className="h-full flex flex-col items-start justify-start ml-4 mt-1">
          <span className="line-clamp-2 cursor-pointer">{book.title}</span>
          <span className="text-xs font-bold text-secondary mt-2 mb-3">{book.authors.join(", ")}</span>
          <RatingInputComponent className="mb-5" initialValue={book.rating} readonly />
          <span className="text-xs">Você começou ler em: <span className="font-bold">{format(parseISO(book.startedAt), "dd/MM/yyyy")}</span></span>
        </div>
      </Link>
      <button className="absolute p-2 top-0 right-0 hidden group-hover:block" onClick={onRemoveBookClick}>
        <FontAwesomeIcon className="text-red-400" icon={faTrashAlt}/>
      </button>
    </li>
  )
}