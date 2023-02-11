// import { Menu, MenuItem, Select } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useTranslation } from "next-i18next";
// import FilterMenuButton from "./FilterMenuButton";

// type FilterOption = {
//   label: string;
//   value: boolean;
// };

// export type FilterVerifiedMenuProps = {
//   onChange: (_newVerifyStatus: boolean) => void;
// };

// const FilterOptions: readonly FilterOption[] = [
//   {
//     label: "verified",
//     value: true,
//   },
//   {
//     label: "unVerified",
//     value: false,
//   },
// ] as const;

// const FilterVerifiedMenu: React.FC<FilterVerifiedMenuProps> = ({
//   onChange,
// }) => {
//   const { t } = useTranslation("home");
//   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
//   const [selectedValue, setSelectedValue] = useState<boolean>(true);
//   const open = Boolean(anchorEl);

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   // const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
//   //   if (typeof event.currentTarget.dataset.value === "undefined") return;
//   //   const value = event.currentTarget.dataset.value === "true";

//   //   setSelectedValue(value);
//   //   handleClose();
//   // };

//   // useEffect(() => {
//   //   onChange(selectedValue);
//   // }, [selectedValue, onChange]);

//   const handleChange = (event: React.MouseEvent<HTMLLIElement>) => {
//     if (typeof event.currentTarget.dataset.value === "undefined") return;
//     const value = event.currentTarget.dataset.value === "true";

//     setSelectedValue(value);
//     handleClose();
//     onChange(selectedValue);
//   };

//   return (
//     <>
//       <Select
//         labelId="demo-multiple-name-label"
//         id="demo-multiple-name"
//         multiple
//         value={selectedValue}
//         onChange={handleChange}
//         input={<OutlinedInput label="Name" />}
//         MenuProps={MenuProps}
//       >
//         {names.map((name) => (
//           <MenuItem
//             key={name}
//             value={name}
//             style={getStyles(name, personName, theme)}
//           >
//             {name}
//           </MenuItem>
//         ))}
//       </Select>
//       {/* <FilterMenuButton
//         onClick={handleClick}
//         ariaControls={"verified-filtrele"}
//         open={open}
//       >
//         {t(
//           `filter.verified.${
//             FilterOptions.find((option) => option.value === selectedValue)
//               ?.label
//           }`
//         )}
//       </FilterMenuButton>
//       <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//         {FilterOptions.map((option, i) => (
//           <MenuItem
//             key={i}
//             onClick={handleMenuItemClick}
//             data-value={option.value}
//             disableRipple
//           >
//             {t(`filter.verified.${option.label}`)}
//           </MenuItem>
//         ))}
//       </Menu> */}
//     </>
//   );
// };

// export { FilterVerifiedMenu };

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
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
    setSelectedStatus(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    onChange(selectedStatus);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedStatus}
          onChange={handleChange}
          // input={<OutlinedInput label="Tag" />}
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
      </FormControl>
    </div>
  );
};
export { FilterVerifiedMenu };
