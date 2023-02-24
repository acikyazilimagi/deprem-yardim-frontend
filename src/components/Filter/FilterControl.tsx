import { FormControl, InputLabel, Select, SelectProps } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = Pick<
  SelectProps<any>,
  "multiple" | "label" | "value" | "name" | "onChange"
> & {
  selected?: string[];
};

const labelID = () => `filter-control-${Date.now()}`;

export const FilterControl = (props: PropsWithChildren<Props>) => {
  const domID = labelID();

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
        onChange={props.onChange}
      >
        {props.children}
      </Select>
    </FormControl>
  );
};
