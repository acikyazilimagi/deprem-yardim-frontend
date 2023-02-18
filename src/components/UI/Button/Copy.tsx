import React from "react";

import { useWindowSize } from "@/hooks/useWindowSize";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button, Typography } from "@mui/material";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type IconButtonProps = React.ComponentProps<typeof Button> & {
  iconProps?: React.ComponentProps<typeof FileCopyIcon>;
};

export interface CopyButtonProps extends IconButtonProps {
  data: string;
  title?: string;
}

export function CopyButton({
  data,
  title,
  onClick,
  iconProps,
  ...props
}: CopyButtonProps) {
  const windowSize = useWindowSize();
  const { copyToClipBoard } = useCopyToClipboard();

  const handleCopyButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    copyToClipBoard(data as string);
    onClick?.(event);
  };
  return (
    <Button {...props} onClick={handleCopyButtonClick}>
      <FileCopyIcon fontSize="small" {...iconProps} />
      {title && windowSize.width < 600 && (
        <Typography fontSize="12px" sx={{ textTransform: "none" }}>
          {title}
        </Typography>
      )}
    </Button>
  );
}
