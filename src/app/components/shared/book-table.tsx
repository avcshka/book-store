import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { IBook } from "@/app/helpers/types/type";
import { ActionIcon, Anchor, Table } from '@mantine/core';
import BookModal from "@/app/components/shared/book-modal";
import Image from "next/image"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface BooksTableProps {
  books: IBook[];
  onDelete: (id: number) => void;
}

const BookTable = ({ books, onDelete }: BooksTableProps) => {
  const router: AppRouterInstance = useRouter();
  const [opened, setOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);


  const rows: React.ReactNode = books.map((book: IBook) => (
    <Table.Tr key={ book.id }>
      <Table.Td><img src={ book.imageLink || './img/empty-book-link.png' } alt="img" width="60" height="80"/></Table.Td>
      <Table.Td>{ book.title }</Table.Td>
      <Table.Td>{ book.author }</Table.Td>
      <Table.Td>{ book.year }</Table.Td>
      <Table.Td>{ book.country }</Table.Td>
      <Table.Td>{ book.language }</Table.Td>
      <Table.Td>{ book.pages }</Table.Td>
      <Table.Td>
        <Anchor href={ book.link ?? undefined } target="_blank" rel="noopener noreferrer" style={ { color: 'blue' } }>
          Visit the article!
        </Anchor>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          onClick={ () => {
            setSelectedBook(book);
            setOpened(true);
          } }
          variant="filled"
        >
          <Image src="/svg/image.svg" width={ 14 } height={ 14 } alt={ "description" }/>
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <div className="flex gap-2">
          <ActionIcon
            variant="default"
            onClick={ () => router.push(`/books/${ book.id }`) }
          >
            <Image src="/svg/edit.svg" width={ 14 } height={ 14 } alt="edit"/>
          </ActionIcon>
          <ActionIcon
            variant="default"
            onClick={ () => onDelete(book.id) }
          >
            <Image src="/svg/delete.svg" width={ 14 } height={ 14 } alt="delete"/>
          </ActionIcon>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="mb-4">
      <Table.ScrollContainer minWidth={ 400 } maxHeight={650}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Cover</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Year of publication</Table.Th>
              <Table.Th>Country</Table.Th>
              <Table.Th>Language</Table.Th>
              <Table.Th>Pages</Table.Th>
              <Table.Th>Link to article</Table.Th>
              <Table.Th>View Book</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{ rows }</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      { selectedBook && (
        <BookModal
          book={ selectedBook }
          opened={ opened }
          onClose={ () => setOpened(false) }
        />
      ) }
    </div>
  );
};

export default BookTable;