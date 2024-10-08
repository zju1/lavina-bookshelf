import { CircularProgress, Container, Stack } from "@mui/material";
import { Header } from "./components/header/Header";
import { useGetAllBooksQuery } from "../../app/store/services/api.service";
import { EmptyShelf } from "./components/book/EmptyShelf";
import { SearchDialog } from "./components/search-dialog/SearchDialog";
import { BookCard } from "./components/book/BookCard";
import { AddBookDialog } from "./components/create-book/CreateBook";
import { useState } from "react";
import { AddedBook } from "./dto/book.dto";
import { useSearchParams } from "react-router-dom";
import { EditBookDialog } from "./components/edit-book/EditBook";

export function BooksPage() {
  const { data, isFetching } = useGetAllBooksQuery();
  const [currentBook, setCurrentBook] = useState<AddedBook | undefined>(
    undefined
  );
  const [params, setParams] = useSearchParams();
  const mutationOpen = params.get("mutate") === "open";

  const handleMutate = (book: AddedBook) => {
    setCurrentBook(book);
    params.set("mutate", "open");
    setParams(params);
  };

  return (
    <Container maxWidth="md">
      <Stack gap="12px">
        <Stack
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "#fff",
            borderRadius: "0 0 6px 6px",
            zIndex: 1,
          }}
        >
          <Header />
        </Stack>
        {isFetching ? (
          <Stack minHeight="300px" alignItems="center" justifyContent="center">
            <CircularProgress size={48} />
          </Stack>
        ) : !data?.data || (data.data && data.data.length === 0) ? (
          <EmptyShelf />
        ) : (
          <Stack
            display="grid"
            gridTemplateColumns={["1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]}
            gap={["12px", "12px", "16px"]}
            pb={["80px", "80px", "12px"]}
          >
            {data.data.map((book, index) => (
              <BookCard
                key={`${book.book.isbn}_${book.book.id}_${index}`}
                onClick={handleMutate}
                {...book}
              />
            ))}
          </Stack>
        )}
      </Stack>
      <SearchDialog />
      <AddBookDialog />
      {mutationOpen && currentBook && (
        <EditBookDialog currentBook={currentBook} />
      )}
    </Container>
  );
}
