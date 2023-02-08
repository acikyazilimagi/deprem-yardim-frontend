import React from "react";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import { IconButton, Typography } from "@mui/material";
import { useWindowSize } from "@/hooks/useWindowSize";

type IconButtonProps = React.ComponentProps<typeof IconButton>;

function copyBillboard(url: string) {
  navigator.clipboard.writeText(url);
}

export interface CopyButtonProps extends IconButtonProps {
  data: string;
  title?: string;
}

export function CopyButton({
  data,
  title,
  onClick = () => {},
  ...props
}: CopyButtonProps) {
  const windowSize = useWindowSize();

  const handleCopyButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    copyBillboard(data);
    onClick(event);
  };
  return (
    <IconButton {...props} onClick={handleCopyButtonClick}>
      {title && windowSize.width < 600 && (
        <Typography fontSize="12px" sx={{ mr: 1 }}>
          {title}
        </Typography>
      )}
      <FileCopyIcon fontSize="small" />
    </IconButton>
  );
}
