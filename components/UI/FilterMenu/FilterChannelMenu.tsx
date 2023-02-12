import { useEffect, useState, MouseEvent } from "react";
import { Menu, MenuItem } from "@mui/material";
import FilterMenuButton from "./FilterMenuButton";

export const channelFilterMenuOptions: readonly ChannelFilterMenuOption[] = [
  {
    label: "Social Media",
    value: "twitter",
  },
  {
    label: "Verified",
    value: "babala",
  },
] as const;

export const initialChannelFilter = channelFilterMenuOptions[0];

export interface ChannelFilterMenuOption {
  label: string;
  value: string;
}

export interface FilterChannelMenuProps {
  onChange: (_option: string) => void;
}

const ChannelFilterMenu: React.FC<FilterChannelMenuProps> = ({ onChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>(
    initialChannelFilter.value
  );
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.dataset.value as string;

    setSelectedValue(value);

    handleClose();
  };

  useEffect(() => {
    onChange(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <>
      <FilterMenuButton
        open={open}
        onClick={handleClick}
        ariaControls="CHANGEME-filtrele"
      >
        {
          channelFilterMenuOptions.find(
            (option) => option.value === selectedValue
          )?.label
        }
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {channelFilterMenuOptions.map((option) => (
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

export default ChannelFilterMenu;
