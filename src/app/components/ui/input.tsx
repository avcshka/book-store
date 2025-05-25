import React from 'react';
import { TextInput, TextInputProps } from "@mantine/core";
import { cn } from "@/app/helpers/utils";

const Input = ({className, ...props}: TextInputProps) => {
  return (
    <TextInput
      className={cn("rounded-md", className)}
      { ...props }
    />
  );
};

export default Input;