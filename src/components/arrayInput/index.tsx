"use client"
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, createRef, forwardRef, useState } from "react"

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "onKeyDown"> & {
  values?: Array<string>;
  error?: string | null;
  emptyMessage?: string;
  valueMessage?: string;
  onChange?: (values: Array<string>) => void;
}

export const ArrayInputComponent = forwardRef<HTMLInputElement, Props>(({ className, values, error, emptyMessage, valueMessage, onChange, ...restProps }, ref) => {
  const containerRef = createRef<HTMLDivElement>();
  const [inputValue, setInpuValue] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [isValueMessageHidden, setIsValueMessageHidden] = useState(false);

  useOutsideClick(containerRef, () => {
    setIsValueMessageHidden(false);
    setIsOpened(false);
  });

  function onFocus() {
    setIsValueMessageHidden(true);
    setIsOpened(true);
  }
  
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInpuValue(event.target.value);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (onChange && !!inputValue) {
        onChange([
          inputValue,
          ...(values ?? []),
        ]);
        
        setInpuValue("");
      }
    }
  }

  function onAddItemClick() {
    if (onChange && !!inputValue) {
      onChange([
        inputValue,
        ...(values ?? []),
      ]);
      
      setInpuValue("");
    }
  }

  function onRemoveItemClick(index: number) {
    return () => {
      if (onChange) {
        const valuesClone = structuredClone(values ?? []);
      
        valuesClone.splice(index, 1);

        onChange(valuesClone);
      }
      
      setInpuValue("");
    }
  }

  return (
    <div ref={containerRef} className={`flex flex-col relative border border-light-gray-100 focus-within:!shadow-[0_0_0_1px_rgb(0,0,0)] ${className}`} onFocus={onFocus}>
      <div className="h-full flex relative items-center justify-start">
        <span className={`w-full absolute ml-3 pointer-events-none ${isValueMessageHidden ? "hidden" : ""}`}>{valueMessage}</span>
        <input ref={ref} className="flex-1 focus:!outline-none focus:!shadow-none py-[6px] px-3 text-sm placeholder:text-sm placeholder:text-light-gray-300" value={inputValue} onChange={onInputChange} onKeyDown={onInputKeyDown} {...restProps}/>
        <button className="w-8 h-8 flex items-center justify-center" onClick={onAddItemClick}>
          <FontAwesomeIcon className="text-gray-400" icon={faPlus}/>
        </button>
      </div>
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : null}
      {isOpened ? (
        <div className="w-full border border-light-gray-100 shadow-md bg-white absolute flex flex-col top-[calc(100%+6px)] z-50">
          {!values || values.length === 0 ? (
            <div className="w-full flex items-center justify-center">
              <span className="text-light-gray-500">{emptyMessage}</span>
            </div>
          ) : (
            values?.map((value, index) => {
              return (
                <div key={`option-${index}-${crypto.randomUUID()}`} className="flex items-center justify-between py-2 mx-3 border-b border-b-light-gray-100">
                  <span>
                    {value}
                  </span>
                  <button className="h-full aspect-square flex items-center justify-center" onClick={onRemoveItemClick(index)}>
                    <FontAwesomeIcon className="text-xs text-red-400" icon={faX}/>
                  </button>
                </div>
              )
            })
          )}
        </div>
      ) : null}
    </div>
  )
});

ArrayInputComponent.displayName = "ArrayInputComponent";