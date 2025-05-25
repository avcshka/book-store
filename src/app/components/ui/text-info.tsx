import React from 'react';
import { Text } from '@mantine/core';

interface TextInfoProps {
  children: React.ReactNode;
}

const TextInfo = ({ children }: TextInfoProps) => {
  return (
    <Text>
      { children }
    </Text>
  );
};

export default TextInfo;