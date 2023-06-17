import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputComponent } from "../input";
import { ButtonComponent } from "../button";
import Link from "next/link";

export function FooterComponent() {
  return (
    <footer className="w-full bg-white font-open-sans shadow">
      <div className="w-full flex border-t border-t-light-gray-100 px-3 pt-4 pb-6">
        <div className="flex-1 flex flex-col items-center justify-start">
          <div className="flex flex-col items-start justify-start max-w-[240px]">
            <Link className="text-secondary uppercase text-2xl mb-4" href="/">
              <FontAwesomeIcon className="text-primary" icon={faBookOpen} /> Reading.com
            </Link>
            <p className="font-lato text-sm">
              Reading.com é um produto fictício para ajudar no processo seletivo para o time de Produto &   Desenvolvimento da Hivecloud.
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-row gap-36">
          <div className="h-full flex flex-col items-start justify-start">
            <h3 className="font-semibold">Reading.com</h3>
            <nav className="h-full flex mt-4">
              <ul className="gap-4 flex flex-col">
                <li>
                  <Link className="text-sm" href="/">Meus livros</Link>
                  </li>
                <li>
                  <Link className="text-sm" href="/">Comunidade</Link>
                  </li>
                <li>
                  <Link className="text-sm" href="/">Novidades</Link>
                  </li>
                <li>
                  <Link className="text-sm" href="/">Aplicativos</Link>
                  </li>
              </ul>
            </nav>
          </div>
          <div className="h-full flex flex-col items-start justify-start">
            <h3 className="font-semibold">Sobre nós</h3>
            <nav className="h-full flex mt-4">
              <ul className="gap-4 flex flex-col">
                <li>
                  <Link className="text-sm" href="/">Blog</Link>
                  </li>
                <li>
                  <Link className="text-sm" href="/">Nossa missão</Link>
                  </li>
                <li>
                  <Link className="text-sm" href="/">Contato</Link>
                  </li>
                <li>
                  <Link className="text-sm" href="/">Carreiras</Link>
                  </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-start">
          <div className="flex flex-col items-start justify-start max-w-[240px]">
            <h3 className="font-semibold">Inscreva-se</h3>
            <InputComponent className="my-4" placeholder="Seu e-mail" type="email"/>
            <ButtonComponent className="w-full p-[6px] text-sm" secondary>Inscrever</ButtonComponent>
          </div>
        </div>
      </div>
      <div className="w-full flex border-t border-t-light-gray-100 px-3 pt-4 pb-6">
        <p className="text-dark-gray-500 text-sm">Copyright © 2020 Reading All rights reserved</p>
        <nav className="ml-3">
          <ul className="h-full flex text-dark-gray-700 text-sm">
            <li>
              <Link href="/">Política de privacidade</Link>
            </li>
            <li className="w-[1px] h-full bg-light-gray-100 mx-4"/>
            <li>
              <Link href="/">Termos de uso</Link>
            </li>
            <li className="w-[1px] h-full bg-light-gray-100 mx-4"/>
            <li>
              <Link href="/">Segurança</Link>
            </li>
            <li className="w-[1px] h-full bg-light-gray-100 mx-4"/>
            <li>
              <Link href="/">Legal</Link>
            </li>
            <li className="w-[1px] h-full bg-light-gray-100 mx-4"/>
            <li>
              <Link href="/">Site map</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}