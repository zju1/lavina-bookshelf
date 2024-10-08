import { ESWrapper } from "./book.style";

export function EmptyShelf() {
  return (
    <ESWrapper>
      <img src="/shelf.png" alt="" />
      <p>
        You haven't added any books yet! As soon as you add them to your
        bookshelf, they will appear here.
      </p>
    </ESWrapper>
  );
}
