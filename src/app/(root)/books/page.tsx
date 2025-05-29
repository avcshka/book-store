'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { IBook, IBookForm } from "@/app/helpers/types/type";
import React, { useState } from "react";
import { useDebounce } from "@/app/helpers/hooks/useDebounce";
import BookTable from "@/app/components/shared/book-table";
import { showNotification } from '@mantine/notifications';
import Image from "next/image"
import { CloseButton, NumberInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { Button, Input, TextArea, TextInfo } from "@/app/components/ui";

const BooksListPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm: string = useDebounce(searchTerm);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", debouncedSearchTerm],
    queryFn: async () => {
      await new Promise(res => setTimeout(res, 700));

      return await axios
        .get("/api/books", { params: { search: debouncedSearchTerm } })
        .then((res: AxiosResponse<IBook[]>) => res.data);
    }
  });

  const form = useForm<IBookForm>({
    initialValues: {
      title: '',
      author: '',
      description: '',
      country: '',
      imageLink: '',
      language: '',
      link: '',
      pages: 0,
      year: 0,
    },

    validate: {
      title: (value: string | undefined) => value!.length > 0 ? null : 'Title is required',
      author: (value: string | undefined) => value!.length > 0 ? null : 'Author is required',
      country: (value: string | undefined) => value!.length > 0 ? null : 'Country is required',
      description: (value: string | undefined) => value!.length > 0 ? null : 'Description is required',
      year: (value: number | null | undefined) => (typeof value === 'number' && value > 0) ? null : 'Year must be a positive number',
    },
  });

  const addBook = useMutation({
    mutationFn: () => axios.post('/api/books', form.values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      form.reset();

      showNotification({
        title: 'Success',
        message: 'Book added successfully',
        color: 'green',
      });
    },
  });

  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
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
      <div className="flex justify-between mb-4">
        <Image className="cursor-pointer" src="/svg/logo-book-store.svg" width="160" height="160" alt="logo book store"/>

        <Input
          placeholder="Search by title..."
          value={ searchTerm }
          onChange={ e => setSearchTerm(e.target.value) }
          className="mt-4 w-full"
          rightSectionPointerEvents="all"
          mt="md"
          rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setSearchTerm('')}
            style={{display: searchTerm ? undefined : 'none'}}
          />
          }
        />

        <div className="flex w-[100px] gap-4 ml-8">
          <Image className="cursor-pointer" src="/svg/favorite.svg" width="24" height="24" alt="favorite"/>
          <Image className="cursor-pointer" src="/svg/user.svg" width="24" height="24" alt="user"/>
          <Image className="cursor-pointer" src="/svg/logout.svg" width="24" height="24" alt="logout"/>
        </div>
      </div>


      <h2 className="text-2xl font-bold">Books</h2>
      <div className="flex items-center gap-2 my-3 flex-wrap">
        <Input
          label="Title"
          className="w-[300px]"
          placeholder="Title"
          { ...form.getInputProps('title') }
        />
        <Input
          label="Author"
          className="w-[300px]"
          placeholder="Author"
          { ...form.getInputProps('author') }
        />
        <NumberInput
          label="Year"
          className="w-[300px]"
          placeholder="Year"
          { ...form.getInputProps('year') }
        />
        <Input
          label="Country"
          className="w-[300px]"
          placeholder="Country"
          { ...form.getInputProps('country') }
        />
        <TextArea
          label="Description"
          autosize
          className="w-[300px]"
          placeholder="Description"
          { ...form.getInputProps('description') }
        />
        <Button
          leftSection={ <Image src="/svg/plus.svg" alt="add" width={ 14 } height={ 14 }/> }
          className="bg-blue-500 text-white mt-6"
          onClick={ () => {
            if (!form.validate().hasErrors) {
              addBook.mutate();
            } else {
              showNotification({
                title: 'Validate error',
                message: 'Please fill all required fields correctly',
                color: 'red',
              })
            }
          } }>
          Add
        </Button>
      </div>


      { isLoading || isDeleting ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin">
            <Image src="/svg/loading.svg" alt="Loading..." width="60" height="60"/>
          </div>
        </div>
      ) : (
        <BookTable books={ books } onDelete={ (id: number) => deleteBook(id) }/>
      ) }

      <div className="mb-2">
        <TextInfo>
          Books: { books.length }
        </TextInfo>
      </div>
    </div>
  );
};

export default BooksListPage;