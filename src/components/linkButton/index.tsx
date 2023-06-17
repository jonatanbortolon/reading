import Link from "next/link";
import { ReactNode } from "react"

type Props = {
  className?: string;
  children?: ReactNode;
  secondary?: boolean;
  href: string;
}
export function LinkButtonComponent({ className, children, secondary = false, href }: Props) {
  return (
    <Link className={`${secondary ? "bg-secondary" : "bg-primary"} p-2 text-white text-base font-lato rounded-full text-center ${className}`} href={href}>
      {children}
    </Link>
  )
}