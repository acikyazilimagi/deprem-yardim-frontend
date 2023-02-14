import { Button, SxProps, Theme } from "@mui/material";
import type { MouseEvent } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type FilterMenuButtonProps = {
  // eslint-disable-next-line no-unused-vars
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  children: React.ReactNode;
  ariaControls?: string;
  sx?: SxProps<Theme> | undefined;
};

const FilterMenuButton: React.FC<FilterMenuButtonProps> = ({
  children,
  onClick,
  open,
  ariaControls,
  sx = {
    background: "white",
    color: "#344054",
    "&:hover": { background: "white" },
    border: "1px solid #BABBBE",
    borderRadius: "8px",
    height: "48px",
  },
}) => {
  return (
    <Button
      aria-controls={open ? ariaControls : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      sx={sx}
      variant="contained"
      disableElevation
      onClick={onClick}
      endIcon={<KeyboardArrowDownIcon />}
      disableFocusRipple
      disableRipple
      disableTouchRipple
    >
      {children}
    </Button>
  );
};

export default FilterMenuButton;
