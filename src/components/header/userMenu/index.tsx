"use client"
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { createRef, useState } from "react";

type Props = {
  name: string;
};

export function UserMenuComponent({ name }: Props) {
  const containerRef = createRef<HTMLDivElement>();
  const [isOpened, setIsOpened] = useState(false);
  
  useOutsideClick(containerRef, () => {
    setIsOpened(false);
  });

  function onContainerClick() {
    setIsOpened(old => !old);
  }

  function onSigoutClick() {
    signOut();
  }

  return (
    <div ref={containerRef} className="h-full flex relative justify-center items-center cursor-pointer" onClick={onContainerClick}>
      <div className="h-full aspect-square rounded-full shadow-md mr-2 p-[2px]">
        <Image className="w-full h-full rounded-full" width="32" height="32" src={`https://ui-avatars.com/api/?size=32&font-size=0.4&name=${encodeURI(name)}`} alt={`${name} avatar`} />
      </div>
      <div className="w-2 h-2 flex items-center justify-center before:w-0 before:h-0 before:border-t-[3.21px] before:border-t-dark-gray-700 before:border-b-0 before:border-x-[3px] before:border-x-transparent before:border-solid"/>
      {isOpened ? (
        <div className="min-w-full border border-light-gray-100 shadow-md bg-white absolute flex flex-col top-[calc(100%+6px)] right-0 z-50">
          <ul>
            <li className="py-2 mx-3" onClick={onSigoutClick}>
              <span className="text-red-400">
                Sair
              </span>
              </li>
          </ul>
        </div>
      ) : null}
    </div>
  )
}