import { Button, SxProps, Theme } from "@mui/material";
import type { MouseEvent } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "@/styles/Home.module.css";

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
}) => {
  return (
    <Button
      className={styles.filterMenuButton}
      aria-controls={open ? ariaControls : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
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
