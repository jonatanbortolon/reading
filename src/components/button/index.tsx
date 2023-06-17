import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  secondary?: boolean;
  isLoading?: boolean;
}

export function ButtonComponent({ className, children, secondary = false, isLoading = false, disabled, ...restProps }: Props) {
  return (
    <button className={`${secondary ? "bg-secondary" : "bg-primary"} p-2 text-white text-base font-lato rounded-full ${className}`} disabled={isLoading || disabled} {...restProps}>
      {children} 
      {isLoading ? (
        <FontAwesomeIcon className="text-white animate-spin ml-2" icon={faSpinner}/>
      ) : null}
    </button>
  )
}