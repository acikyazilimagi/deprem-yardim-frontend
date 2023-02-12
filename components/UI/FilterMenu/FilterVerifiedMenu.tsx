import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Checkbox, ListItemText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export type FilterVerifiedMenuProps = {
  onChange: (_newVerifyStatus: string[]) => void;
};

const options = ["verified", "unverified"];

const FilterVerifiedMenu: React.FC<FilterVerifiedMenuProps> = ({
  onChange,
}) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedStatus>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setSelectedStatus(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClose = () => {
    onChange(selectedStatus);
  };

  return (
    <div>
      <Select
        labelId="filter-verified-menu-label"
        id="filter-verified-menu"
        multiple
        sx={{
          background: "white",
          color: "#344054",
          "&:hover": { background: "white" },
          border: "1px solid #BABBBE",
          borderRadius: "8px",
          height: "48px",
          width: "100%",
        }}
        value={selectedStatus}
        onChange={handleChange}
        onClose={handleClose}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedStatus.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
export { FilterVerifiedMenu };
