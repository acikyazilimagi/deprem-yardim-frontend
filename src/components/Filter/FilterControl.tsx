import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { PropsWithChildren } from "react";

type Props<TSelect = string> = Pick<
  SelectProps<any>,
  "multiple" | "label" | "value" | "name"
> & {
  selected?: TSelect;
  onChange: (_event: SelectChangeEvent<TSelect>, _selected: TSelect) => void;
};

const labelID = () => `filter-control-${Date.now()}`;

export const FilterControl = <TSelect = string,>(
  props: PropsWithChildren<Props<TSelect>>
) => {
  const domID = labelID();

  const onChange = (event: SelectChangeEvent<TSelect>) => {
    const { value } = event.target;
    props.onChange(event, value as TSelect);
  };

  return (
    <FormControl>
      <InputLabel id={domID}>{props.label}</InputLabel>
      <Select
        labelId={domID}
        multiple={props.multiple}
        value={props.value}
        id={props.name}
        label={props.label}
        name={props.name}
        onChange={onChange}
      >
        {props.children}
      </Select>
    </FormControl>
  );
};
