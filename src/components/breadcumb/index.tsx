import { faChevronRight, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

type Props = {
  className?: string;
  paths?: Array<string>;
}

export function BreadcumbComponent({ className, paths = [] }: Props) {
  return (
    <div className={`flex ${className} items-center justify-start`}>
      <FontAwesomeIcon className={`text-[10px] ${paths.length === 0 ? "text-black" : "text-dark-gray-500"}`} icon={faHouse}/>
      {paths.map((path, index) => {
        return (
          <Fragment key={`breadcumb-path-${index}`}>
            <FontAwesomeIcon className="mx-2 text-dark-gray-500 text-[10px]" icon={faChevronRight}/>
            <span className={`text-xs ${index === paths.length - 1 ? "text-dark-gray-500" : "text-black"}`}>{path}</span>
          </Fragment>
        )
      })}
    </div>
  )
}