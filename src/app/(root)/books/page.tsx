'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IBookForm } from "@/app/helpers/types/type";
import React, { useState } from "react";
import { useDebounce } from "@/app/helpers/hooks/useDebounce";
import Input from "@/app/components/ui/input";
import BookTable from "@/app/components/shared/book-table";
import TextInfo from "@/app/components/ui/text-info";
import TextArea from "@/app/components/ui/text-area";
import Button from "@/app/components/ui/button";
import { showNotification } from '@mantine/notifications';
import Image from "next/image"

const BooksListPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm: string = useDebounce(searchTerm);

  const initialForm: IBookForm = {
    title: "",
    author: "",
    description: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: 0,
    year: 0,
  };

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", debouncedSearchTerm],
    queryFn: () =>
      axios
        .get("/api/books", { params: { search: debouncedSearchTerm } })
        .then((res) => res.data),
  });

  const [form, setForm] = useState<IBookForm>(initialForm);

  const addBook = useMutation({
    mutationFn: () => axios.post('/api/books', form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setForm({ ...initialForm, year: null });
      showNotification({
        title: 'Success',
        message: 'Book added successfully',
        color: 'green',
      });
    },
  });

  const {  mutate: deleteBook, isPending: isDeleting} = useMutation({
    mutationFn: (id: number) => axios.delete(`/api/books/${ id }`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      showNotification({
        title: 'Success',
        message: 'Book deleted successfully',
        color: 'red',
      });
    },
  });

  return (
    <div className="ml-12 mr-12">
      <div className="flex justify-between mb-8">
        <Image className="cursor-pointer" src="/svg/logo-book-store.svg" width="160" height="160" alt="logo book store"/>
        <div className="flex w-[100px] gap-4">
          <Image className="cursor-pointer" src="/svg/favorite.svg" width="24" height="24" alt="favorite"/>
          <Image className="cursor-pointer" src="/svg/user.svg" width="24" height="24" alt="user"/>
          <Image className="cursor-pointer" src="/svg/logout.svg" width="24" height="24" alt="logout"/>
        </div>
      </div>

      <Input
        placeholder="Search by title..."
        value={ searchTerm }
        onChange={ e => setSearchTerm(e.target.value) }
        className="border p-1 mb-4 w-full"
      />

      <h2 className="text-2xl font-bold">Books</h2>
      <div className="flex items-center gap-2 my-3 flex-wrap">
        <Input
          className="w-[300px] p-1"
          value={ form.title }
          placeholder="Title"
          onChange={ e => setForm({ ...form, title: e.target.value }) }
        />
        <Input
          className="w-[300px] p-1"
          value={ form.author }
          placeholder="Author"
          onChange={ e => setForm({ ...form, author: e.target.value }) }
        />
        <Input
          className="w-[300px] p-1"
          placeholder="Year"
          onChange={ e => setForm({ ...form, year: Number(e.target.value) }) }
        />
        <Input
          className="w-[300px] p-1"
          value={ form.country }
          placeholder="Country"
          onChange={ e => setForm({ ...form, country: e.target.value }) }
        />
        <TextArea
          autosize
          className="w-[300px] h-12 p-1"
          value={ form.description! }
          placeholder="Description"
          onChange={ e => setForm({ ...form, description: e.target.value }) }
        />
        <Button leftSection={ <Image src="/svg/plus.svg" alt="add" width={14} height={14}/> } className="bg-blue-500 text-white px-2 py-1"
                onClick={ () => addBook.mutate() }>
          Add
        </Button>
      </div>


      { isLoading || isDeleting ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Image src="/svg/loading.svg" alt="Loading..." width="60" height="60"/>
        </div>
      ) : (
        <BookTable books={ books } onDelete={ (id: number) => deleteBook(id) }/>
      ) }

      <div className="mb-6">
        <TextInfo>
          Books: { books.length }
        </TextInfo>
      </div>
    </div>
  );
};

export default BooksListPage;