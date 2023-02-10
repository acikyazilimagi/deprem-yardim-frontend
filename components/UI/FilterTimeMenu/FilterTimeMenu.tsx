import React, { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "../../../styles/Home.module.css";
import { localStorageKeys } from "../Map/utils";

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

export const FilterOptions: readonly FilterOption[] = [
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

type Props = {
  onChangeTime: (_newerThanTimestamp?: number) => void;
};

const FilterTimeMenu = ({ onChangeTime }: Props) => {
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
    window.localStorage.setItem(
      localStorageKeys.timeFilter,
      JSON.stringify(valueToOption(value))
    );
    handleClose();
  };

  const getLabel = (options: readonly FilterOption[], value: string) => {
    const option = options.find((option) => option.value === value);
    return option?.label;
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

  useEffect(() => {
    const timeFilter = window.localStorage.getItem(localStorageKeys.timeFilter);

    if (timeFilter) {
      const timeFilterValue = JSON.parse(timeFilter);
      setSelectedValue(timeFilterValue.value);
    }
  }, []);

  return (
    <Box>
      <div className={styles.filterMenu}>
        <Button
          aria-controls={open ? "zaman-filtrele" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            background: "white",
            color: "#344054",
            "&:hover": { background: "white" },
            border: "1px solid #BABBBE",
            borderRadius: "8px",
            height: "48px",
          }}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
          {getLabel(FilterOptions, selectedValue)}
        </Button>
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
      </div>
    </Box>
  );
};

export default FilterTimeMenu;
