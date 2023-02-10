import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import FilterMenuButton from "./FilterMenuButton";

type TimeOption =
  | "last30Minutes"
  | "last1Hour"
  | "last3Hours"
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

const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;

const FilterOptions: readonly FilterOption[] = [
  {
    label: "Son 30 dakika",
    inMilliseconds: (1 * HOUR_IN_MILLISECONDS) / 2,
    value: "last30Minutes",
  },
  {
    label: "Son 1 Saat",
    inMilliseconds: 1 * HOUR_IN_MILLISECONDS,
    value: "last1Hour",
  },
  {
    label: "Son 3 Saat",
    inMilliseconds: 3 * HOUR_IN_MILLISECONDS,
    value: "last3Hours",
  },
  {
    label: "Son 6 Saat",
    inMilliseconds: 6 * HOUR_IN_MILLISECONDS,
    value: "last6Hours",
  },
  {
    label: "Son 12 Saat",
    inMilliseconds: 12 * HOUR_IN_MILLISECONDS,
    value: "last12Hours",
  },
  {
    label: "Son 24 Saat",
    inMilliseconds: 24 * HOUR_IN_MILLISECONDS,
    value: "last24Hours",
  },
  {
    label: "Son 3 Gün",
    inMilliseconds: 3 * DAY_IN_MILLISECONDS,
    value: "last3Days",
  },
  { label: "Tüm zamanlar", inMilliseconds: -1, value: "all" },
] as const;

const valueToOption = (value: string): FilterOption | undefined => {
  return FilterOptions.find((option) => option.value === value);
};

export type FilterTimeMenuProps = {
  onChangeTime: (_newerThanTimestamp?: number) => void;
};

const FilterTimeMenu: React.FC<FilterTimeMenuProps> = ({ onChangeTime }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<TimeOption>("last12Hours");
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
    <>
      <FilterMenuButton
        ariaControls={"zaman-filtrele"}
        open={open}
        onClick={handleClick}
      >
        {FilterOptions.find((option) => option.value === selectedValue)?.label}
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {FilterOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={handleMenuItemClick}
            data-value={option.value}
            disableRipple
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterTimeMenu;
