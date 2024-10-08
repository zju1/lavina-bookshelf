export interface Book {
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
}

export interface BookDTO {
  isbn: string;
}

export interface UpdateBookDTO {
  status: number;
}

export interface AddedBook {
  book: {
    id: number;
    isbn: string;
    title: string;
    cover: string;
    author: string;
    published: number;
    pages: number;
  };
  status: number;
}
