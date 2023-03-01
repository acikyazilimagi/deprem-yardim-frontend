import {
  Button,
  IconButton,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IStyles {
  [key: string]: SxProps<Theme>;
}
interface IFilterButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  buttonLabel: string;
}

export const FilterButtonComponent = (props: IFilterButtonProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return matches ? (
    <Button
      sx={styles.button}
      color="inherit"
      variant="contained"
      startIcon={props.icon}
      onClick={props.onClick}
    >
      {props.buttonLabel}
    </Button>
  ) : (
    <IconButton sx={styles.button} color="inherit" onClick={props.onClick}>
      {props.icon}
    </IconButton>
  );
};
const styles: IStyles = {
  button: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    border: `solid 1px ${theme.palette.grey[300]}`,
    color: `${theme.palette.grey[700]} !important`,
    borderRadius: "8px !important",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    },
  }),
};
