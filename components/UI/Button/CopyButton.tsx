import React from "react";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import { IconButton } from "@mui/material";

type IconButtonProps = React.ComponentProps<typeof IconButton>;

function copyBillboard(url: string) {
  navigator.clipboard.writeText(url);
}

export interface CopyButtonProps extends IconButtonProps {
  data: string;
}

export function CopyButton({
  data,
  onClick = () => {},
  ...props
}: CopyButtonProps) {
  const handleCopyButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    copyBillboard(data);
    onClick(event);
  };
  return (
    <IconButton {...props} onClick={handleCopyButtonClick}>
      <FileCopyIcon />
    </IconButton>
  );
}
