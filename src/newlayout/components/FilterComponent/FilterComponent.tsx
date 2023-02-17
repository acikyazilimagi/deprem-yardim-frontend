import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Fade,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CloseIcon from "@mui/icons-material/Close";

interface IFilterElement {
  queryParam: string;
  label: string;
  values: string[];
}

interface IFilterState {
  filters: IFilterElement[];
  isOpen: boolean;
  setFilter: (_filters: IFilterElement[]) => void;
  toggle: (_checked: boolean) => void;
}

interface IStyles {
  [key: string]: SxProps<Theme>;
}

interface IFilterComponent {
  onChange: (_filters: IFilterElement[]) => void;
}

export const useFilter = create<IFilterState>()(
  devtools(
    (set) => ({
      filters: [],
      isOpen: false,
      setFilter: (_filters) =>
        set(() => ({ filters: _filters }), undefined, { type: "setFilter" }),
      toggle: (checked: boolean) =>
        set(() => ({ isOpen: checked }), undefined, { type: "toggle" }),
    }),
    { name: "FilterComponent" }
  )
);

export const FilterComponent = (props: IFilterComponent) => {
  const filterView = useFilter();
  if (!filterView.isOpen) return null;
  return (
    <Fade in={filterView.isOpen}>
      <Container sx={styles.container}>
        <Box>
          <Card sx={styles.card}>
            <CardHeader
              action={
                <IconButton
                  aria-label="close"
                  onClick={() => {
                    filterView.toggle(false);
                    props.onChange(filterView.filters);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              }
              title={"Filter"}
            />
            <CardContent></CardContent>
          </Card>
        </Box>
      </Container>
    </Fade>
  );
};

const styles: IStyles = {
  container: () => ({
    padding: "0 !important",
    pointerEvents: "all",
  }),
  card: (theme: Theme) => ({
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      height: "100vh",
    },
    [theme.breakpoints.up("sm")]: {
      width: 250,
      height: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: 250,
      height: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      width: 250,
      height: "auto",
    },
    [theme.breakpoints.up("xl")]: {
      width: 250,
      height: "auto",
    },
  }),
  header: () => ({ fontSize: 14 }),
  table: () => ({ marginTop: 3 }),
};
