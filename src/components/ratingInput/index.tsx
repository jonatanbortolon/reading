"use client"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "react-simple-star-rating";

type Props = {
  className?: string;
  initialValue?: number;
  onChange?: (value: number) => void
  readonly?: boolean;
  error?: string;
}

export function RatingInputComponent({ className, initialValue, onChange, readonly, error }: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      <Rating
        onClick={onChange}
        initialValue={initialValue}
        readonly={readonly}
        allowFraction={false}
        fillClassName="!flex gap-3"
        emptyClassName="!flex gap-3"
        fillIcon={ 
          <FontAwesomeIcon className="text-xl" icon={faStar} />
        }
        emptyIcon={
          <FontAwesomeIcon className="text-xl" icon={faStar} />
        } 
      />
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : null}
    </div>
  )
}