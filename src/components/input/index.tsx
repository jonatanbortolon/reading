"use client"
import { InputHTMLAttributes, forwardRef } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
}

export const InputComponent = forwardRef<HTMLInputElement, Props>(({ className, error, ...restProps }, ref) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <input ref={ref} className="border border-light-gray-100 py-[6px] px-3 text-sm placeholder:text-sm placeholder:text-light-gray-300" {...restProps}/>
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : null}
    </div>
  )
});

InputComponent.displayName = "InputComponent";