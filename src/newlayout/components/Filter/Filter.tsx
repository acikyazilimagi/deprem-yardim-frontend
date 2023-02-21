import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

export interface IFilterElement {
  queryParam: string;
  label: string;
  values: string[];
  defaultValues: number[] | "all";
  type: "single-select" | "multi-select";
}

interface IFilterSelectState {
  [key: string]: string[];
}

interface IFilterState {
  filters: IFilterElement[];
  selectedValues: IFilterSelectState;
  isOpen: boolean;
  setFilters: (_filters: IFilterElement[]) => void;
  toggle: (_isOpen: boolean) => void;
  setSelectedValues: (_selectedValues: IFilterSelectState) => void;
}

interface IStyles {
  [key: string]: SxProps<Theme>;
}

export const createUseFilter = () => {
  return create<IFilterState>()(
    devtools(
      (set) => ({
        filters: [],
        selectedValues: {},
        isOpen: true,
        setFilters: (filters: IFilterElement[]) =>
          set(
            () => {
              const _selectedValues = filters.map((filter) => {
                return {
                  [filter.queryParam]:
                    filter.defaultValues === "all"
                      ? filter.values
                      : filter.defaultValues.map(
                          (index) => filter.values[index]
                        ),
                };
              });
              const _object = Object.assign({}, ..._selectedValues);
              return { filters, selectedValues: _object };
            },
            undefined,
            { type: "setFilters" }
          ),
        toggle: (isOpen: boolean) =>
          set(() => ({ isOpen }), undefined, { type: "toggle" }),
        setSelectedValues: (selectedValues: IFilterSelectState) =>
          set(
            (state) => ({
              selectedValues: { ...state.selectedValues, ...selectedValues },
            }),
            undefined,
            {
              type: "setSelectedValues",
            }
          ),
      }),
      { name: "FilterComponent" }
    )
  );
};

interface IFilterComponent {
  filterStore: ReturnType<typeof createUseFilter>;
  filters: IFilterElement[];
  title: string;
}

export const FilterComponent = (props: IFilterComponent) => {
  const filterView = props.filterStore();
  useEffect(() => {
    filterView.setFilters(props.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.filters]);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;

    const selectedValue = typeof value === "string" ? value.split(",") : value;
    if (selectedValue.length > 0) {
      filterView.setSelectedValues({
        [event.target.name]: selectedValue,
      });
    }
  };

  const valueSelector = (filter: IFilterElement) => {
    const value = filterView.selectedValues[filter.queryParam];
    if (filter.type === "single-select") {
      return value[0];
    } else {
      return value;
    }
  };

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
                  }}
                >
                  <CloseIcon />
                </IconButton>
              }
              title={props.title}
            />
            <CardContent>
              <Stack display={"flex"} direction={"column"} rowGap={2}>
                {filterView.filters.map((filter, index) => {
                  return (
                    <FormControl key={`filter-form-control-${index}`}>
                      <InputLabel id="select-label">{filter.label}</InputLabel>
                      <Select
                        multiple={filter.type === "multi-select"}
                        labelId="select-label"
                        // @ts-ignore - TODO: Fix this type error, if multiple is true, value should be an array.
                        value={valueSelector(filter)}
                        id={filter.queryParam}
                        label={filter.label}
                        name={filter.queryParam}
                        onChange={handleChange}
                      >
                        {filter.values.map((value, index) => (
                          <MenuItem
                            key={`filter-menu-item-${index}`}
                            value={value}
                          >
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                })}
              </Stack>
            </CardContent>
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
  card: () => ({
    width: 250,
    height: "auto",
  }),
  header: () => ({ fontSize: 14 }),
  table: () => ({ marginTop: 3 }),
};
