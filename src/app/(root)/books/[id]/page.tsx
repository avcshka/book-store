'use client';

import { use, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IBook, IdParams } from "@/app/helpers/types/type";
import Input from "@/app/components/ui/input";
import TextArea from "@/app/components/ui/text-area";
import Link from "next/link";
import Button from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { Title } from '@mantine/core';
import { showNotification } from "@mantine/notifications";

const EditBookPage = ({ params }: IdParams) => {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [editForm, setEditForm] = useState<IBook>({
    id: 0,
    title: "",
    author: "",
    description: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: 0,
    year: 0,
  });

  const { data: bookToEdit, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: () => axios.get(`/api/books/${id}`).then(res => res.data),
  });

  const updateBook = useMutation({
    mutationFn: ({ id, book }: { id: number; book: IBook }) => axios.put(`/api/books/${id}`, book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      router.push('/books');
      showNotification({
        title: 'Success',
        message: 'Book updated successfully',
        color: 'green',
      });
    },
  });

  useEffect(() => {
    if (bookToEdit) {
      setEditForm(bookToEdit);
    }
  }, [bookToEdit]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <Title order={2} className="mb-6 text-center">Edit Book</Title>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading book data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Title"
            className="p-2"
            value={editForm.title}
            placeholder="Title"
            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
          />
          <Input
            label="Author"
            className="p-2"
            value={editForm.author}
            placeholder="Author"
            onChange={e => setEditForm({ ...editForm, author: e.target.value })}
          />
          <Input
            label="Year"
            className="p-2"
            value={editForm.year || ''}
            placeholder="Year"
            onChange={e => setEditForm({ ...editForm, year: Number(e.target.value) })}
          />
          <Input
            label="Country"
            className="p-2"
            value={editForm.country}
            placeholder="Country"
            onChange={e => setEditForm({ ...editForm, country: e.target.value })}
          />
          <Input
            label="Language"
            className="p-2"
            value={editForm.language || ""}
            placeholder="Language"
            onChange={e => setEditForm({ ...editForm, language: e.target.value })}
          />
          <Input
            label="Pages"
            className="p-2"
            value={editForm.pages || ''}
            placeholder="Pages"
            onChange={e => setEditForm({ ...editForm, pages: Number(e.target.value) })}
          />
          <Input
            label="Article Link"
            className="p-2"
            value={editForm.link || ""}
            placeholder="Article Link"
            onChange={e => setEditForm({ ...editForm, link: e.target.value })}
          />
          <Input
            label="Image URL"
            className="p-2"
            value={editForm.imageLink || ""}
            placeholder="Image URL"
            onChange={e => setEditForm({ ...editForm, imageLink: e.target.value })}
          />

          <div className="md:col-span-2">
            <TextArea
              label="Description"
              className="w-full min-h-[100px] p-2"
              value={editForm.description || ''}
              placeholder="Description"
              onChange={e => setEditForm({ ...editForm, description: e.target.value })}
              autosize
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <Link href="/books">
              <Button variant="outline" className="px-4 py-2">Cancel</Button>
            </Link>
            <Button
              className="bg-blue-600 text-white px-4 py-2"
              onClick={() => updateBook.mutate({ id, book: editForm })}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBookPage;
