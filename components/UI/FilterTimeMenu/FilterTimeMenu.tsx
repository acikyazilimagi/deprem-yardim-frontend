import React, { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type TimeOption =
  | "last6Hours"
  | "last12Hours"
  | "last24Hours"
  | "last3Days"
  | "all";

type FilterOption = {
  label: string;
  inMilliseconds: number;
  value: TimeOption;
};

const FilterOptions: readonly FilterOption[] = [
  {
    label: "Son 6 Saat",
    inMilliseconds: 6 * 60 * 60 * 1000,
    value: "last6Hours",
  },
  {
    label: "Son 12 Saat",
    inMilliseconds: 12 * 60 * 60 * 1000,
    value: "last12Hours",
  },
  {
    label: "Son 24 Saat",
    inMilliseconds: 24 * 60 * 60 * 1000,
    value: "last24Hours",
  },
  {
    label: "Son 3 Gün",
    inMilliseconds: 3 * 24 * 60 * 60 * 1000,
    value: "last3Days",
  },
  { label: "Tüm zamanlar", inMilliseconds: -1, value: "all" },
] as const;

const valueToOption = (value: string): FilterOption | undefined => {
  return FilterOptions.find((option) => option.value === value);
};

type Props = {
  onChangeTime: (_newerThanTimestamp?: number) => void;
};

const FilterTimeMenu = ({ onChangeTime }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<TimeOption>("last24Hours");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.dataset.value as TimeOption;

    setSelectedValue(value);

    handleClose();
  };

  useEffect(() => {
    const option = valueToOption(selectedValue);

    if (!option) return;
    if (option.inMilliseconds === -1) {
      onChangeTime(undefined);
    } else {
      const currentTimestampInMillis = Date.now().valueOf();
      const pastTimestampInMillis =
        currentTimestampInMillis - option.inMilliseconds;
      const pastTimestampInSeconds = Math.floor(pastTimestampInMillis / 1000);
      onChangeTime(Math.floor(pastTimestampInSeconds));
    }
  }, [onChangeTime, selectedValue]);

  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: "12px", sm: "24px" },
        top: { xs: "12px", sm: "24px" },
        zIndex: "502",
      }}
    >
      <Button
        aria-controls={open ? "zaman-filtrele" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          background: "white",
          color: "black",
          "&:hover": { background: "white" },
        }}
        size="small"
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        disableFocusRipple
        disableRipple
        disableTouchRipple
      >
        {FilterOptions.find((option) => option.value === selectedValue)?.label}
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {FilterOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={handleMenuItemClick}
            data-value={option.value}
            disableRipple
            dense
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterTimeMenu;
