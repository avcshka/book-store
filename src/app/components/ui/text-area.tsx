import React from 'react';
import { Textarea, TextareaProps } from "@mantine/core";
import { cn } from "@/app/helpers/utils";

const TextArea = ({className, ...props}: TextareaProps) => {
  return (
    <Textarea
      className={cn("rounded-md", className)}
      { ...props }
    />
  );
};

export default TextArea;