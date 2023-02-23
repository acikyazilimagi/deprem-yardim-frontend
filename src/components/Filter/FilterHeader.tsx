import { CardHeader, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type HeaderProps = {
  onClose: () => void;
  title: string;
};

export const FilterHeader = ({ onClose, title }: HeaderProps) => {
  return (
    <CardHeader
      action={
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
      title={title}
    />
  );
};
