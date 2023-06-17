"use client"
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react"
import DatePicker, { ReactDatePicker, ReactDatePickerProps } from "react-datepicker";

type Props = Omit<ReactDatePickerProps, "dateFormat"> & {
  error?: string | null;
}

export const DateInputComponent = forwardRef<ReactDatePicker, Props>(({ className, error, ...restProps }, ref) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <DatePicker ref={ref} className="border border-light-gray-100 py-[6px] px-3 text-sm placeholder:text-sm placeholder:text-light-gray-300" dateFormat="dd/MM/yyyy" {...restProps} />
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : null}
    </div>
  )
});

DateInputComponent.displayName = "DateInputComponent";