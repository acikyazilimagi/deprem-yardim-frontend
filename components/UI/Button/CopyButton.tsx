import FileCopyIcon from "@mui/icons-material/FileCopy";
import { IconButton } from "@mui/material";

type IconButtonProps = React.ComponentProps<typeof IconButton>;

function copyBillboard(url: string) {
  navigator.clipboard.writeText(url);
}

export interface CopyButtonProps extends IconButtonProps {
  data: string;
}

export function CopyButton({ data, ...props }: CopyButtonProps) {
  return (
    <IconButton {...props} onClick={() => copyBillboard(data)}>
      <FileCopyIcon />
    </IconButton>
  );
}
