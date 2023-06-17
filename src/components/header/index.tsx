import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { UserMenuComponent } from "./userMenu"
import { LinkButtonComponent } from "../linkButton";
import { getServerSession } from "next-auth";

export async function HeaderComponent() {
  const session = await getServerSession();
console.log(session);

  return (
    <header className="w-full flex items-center justify-center px-3 bg-white font-open-sans shadow">
      <div className="w-full h-full flex flex-row max-w-5xl px-3">
        <div className="h-ful flex py-3">
          <Link className="text-secondary uppercase text-xl" href="/">
            <FontAwesomeIcon className="text-primary" icon={faBookOpen} /> Reading.com
          </Link>
        </div>
        <nav className="flex ml-8 mr-auto">
          <ul className="h-full flex text-sm text-secondary">
            <li className="h-full flex justify-center items-center relative cursor-pointer before:absolute before:w-full before:h-1 before:rounded-b-md before:bg-secondary before:top-0">
              <Link href="/">Meus livros</Link>
            </li>
          </ul>
        </nav>
        <div className="h-full flex py-3">
          {session ? (
              <UserMenuComponent name={session.user.name as string} />
            ) : (
              <LinkButtonComponent className="px-6" href="/entrar">Entre agora</LinkButtonComponent>
            )
          }
        </div>
      </div>
    </header>
  )
}