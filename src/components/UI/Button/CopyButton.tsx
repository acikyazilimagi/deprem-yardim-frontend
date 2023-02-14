import React from "react";

import { useWindowSize } from "@/hooks/useWindowSize";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button, Typography } from "@mui/material";

type IconButtonProps = React.ComponentProps<typeof Button> & {
  iconProps?: React.ComponentProps<typeof FileCopyIcon>;
};

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
  onClick,
  iconProps,
  ...props
}: CopyButtonProps) {
  const windowSize = useWindowSize();

  const handleCopyButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    copyBillboard(data);
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
