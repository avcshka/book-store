import React from 'react';
import { Button, ButtonProps } from "@mantine/core";
import { cn } from "@/app/helpers/utils";

interface ICustomButtonProps extends ButtonProps {
  onClick?: () => void;
}

const CustomButton = ({children, className, onClick, ...props}: ICustomButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn("", className)}
      { ...props }
    >
      {children}
    </Button>
  );
};

export default CustomButton;