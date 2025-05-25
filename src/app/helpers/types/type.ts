export interface IBook {
  id: number;
  author: string,
  country: string,
  imageLink: string | null;
  language: string | null;
  link: string | null;
  pages: number | null;
  title: string;
  year: number | null;
  description: string;
}

export type IBookForm = Partial<Omit<IBook, 'id'>>;

export type IdParams = {
  params: Promise<{ id: number }>;
}

export type SearchParams = {
  params: Promise<{ searchTerm: string }>;
}

