import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { PropsWithChildren } from "react";

type Props = Pick<SelectProps<any>, "multiple" | "label" | "value" | "name"> & {
  selected?: string[];
  onChange: (_event: SelectChangeEvent, _selected: string[]) => void;
};

const labelID = () => `filter-control-${Date.now()}`;

export const FilterControl = (props: PropsWithChildren<Props>) => {
  const domID = labelID();

  const onChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    console.log("original onChange event", value);
    const values = typeof value === "string" ? value.split(",") : value;
    if (values.length > 0) {
      props.onChange(event, values);
    }
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
