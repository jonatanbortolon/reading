"use client"
import { TextareaHTMLAttributes, forwardRef } from "react"

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string | null;
}

export const TextAreaInputComponent = forwardRef<HTMLTextAreaElement, Props>(({ className, error, ...restProps }, ref) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <textarea ref={ref} className={`border border-light-gray-100 py-[6px] px-3 text-sm placeholder:text-sm placeholder:text-light-gray-300 ${className}`} {...restProps} />
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : null}
    </div>
  )
});

TextAreaInputComponent.displayName = "TextAreaInputComponent";