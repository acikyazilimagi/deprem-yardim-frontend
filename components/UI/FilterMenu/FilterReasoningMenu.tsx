import { useEffect, useState, MouseEvent } from "react";
import { Menu, MenuItem } from "@mui/material";
import FilterMenuButton from "./FilterMenuButton";

type ReasoningFilterMenuOptionType = "reason" | "channel";

export const reasoningFilterMenuOptions: readonly ReasoningFilterMenuOption[] =
  [
    {
      label: "Depremzede",
      value: "twitter",
      type: "channel",
    },
    {
      label: "Erzak Yardımı",
      value: "erzak",
      type: "reason",
    },
    {
      label: "Teyitli",
      value: "enkaz",
      type: "reason",
    },
  ] as const;

export const initialReasoningFilter = reasoningFilterMenuOptions[0];

export interface ReasoningFilterMenuOption {
  label: string;

  value: string;

  type: ReasoningFilterMenuOptionType;
}

const valueToOption = (value: string): ReasoningFilterMenuOption => {
  return reasoningFilterMenuOptions.find(
    (option) => option.value === value
  ) as ReasoningFilterMenuOption;
};

export interface FilterReasoningMenuProps {
  onChange: (_option: ReasoningFilterMenuOption) => void;
}

const ReasoningFilterMenu: React.FC<FilterReasoningMenuProps> = ({
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>(
    initialReasoningFilter.value
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
    const option = valueToOption(selectedValue);

    onChange(option);
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
          reasoningFilterMenuOptions.find(
            (option) => option.value === selectedValue
          )?.label
        }
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {reasoningFilterMenuOptions.map((option) => (
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

export default ReasoningFilterMenu;
