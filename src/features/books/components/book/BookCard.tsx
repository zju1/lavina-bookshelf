import { useState } from "react";
import { AddedBook } from "../../dto/book.dto";
import { BCWrapper } from "./book.style";
import { statuses } from "../../../../constants/statuses";

export function BookCard({
  onClick,
  ...props
}: AddedBook & {
  onClick: (book: AddedBook) => void;
}) {
  const status = statuses[props.status];
  const [error, setError] = useState(false);
  return (
    <BCWrapper onClick={() => onClick(props)}>
      <img
        src={error ? "/placeholder.png" : props.book.cover}
        alt={props.book.title}
        onError={() => setError(true)}
      />
      <div>
        <h3 className="text-2">{props.book.title}</h3>
        <p className="text-1">{props.book.author}</p>
      </div>
      <span className="status" style={{ background: status.color }}>
        {status.title}
      </span>
    </BCWrapper>
  );
}
