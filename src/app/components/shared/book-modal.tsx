'use client';

import React, { useState } from 'react';
import { Image, Modal, Text } from '@mantine/core';
import { IBook } from '@/app/helpers/types/type';

interface BookModalProps {
  book: IBook;
  opened: boolean;
  onClose: () => void;
}

const BookModal = ({ book, opened, onClose}: BookModalProps) => {
  const [expanded, setExpanded] = useState(false);

  const shortDescription = book.description?.slice(0, 100) || '';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<p className="font-bold">{book.title}</p>}
      size="lg"
      centered
    >
      <div className="space-y-4">
        <Text size="sm" className="text-gray-600">
          <strong>Author:</strong> {book.author} ({book.year})
        </Text>

        <Text size="sm" className="text-gray-600">
          <strong>Country:</strong> {book.country}
        </Text>

        <Image
          src={book.imageLink || '/img/empty-book-link.png'}
          alt="Book cover"
          width={200}
          height={200}
          radius="md"
          className="mx-auto"
        />

        <Text size="sm" className="text-gray-600">
          <strong>Language:</strong> {book.language}
        </Text>

        <Text size="sm">
          <strong>Description:</strong>{' '}
          {expanded ? book.description : shortDescription}
          {book.description.length > 100 && (
            <span
              onClick={() => setExpanded((prev) => !prev)}
              className="text-blue-600 cursor-pointer ml-2"
            >
              {expanded ? 'Hide' : '... Show more'}
            </span>
          )}
        </Text>

        <Text size="sm" className="text-gray-600">
          <strong>Pages:</strong> {book.pages}
        </Text>

        {book.link && (
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline text-sm block"
          >
            Visit the description!
          </a>
        )}
      </div>
    </Modal>
  );
};

export default BookModal;
