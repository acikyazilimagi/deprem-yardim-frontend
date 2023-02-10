import { useEffect, useState, MouseEvent } from "react";
import { Menu, MenuItem } from "@mui/material";
import FilterMenuButton from "./FilterMenuButton";
import { useTranslation } from "next-i18next";

type ReasoningFilterMenuOptionType = "reason" | "channel";

export const reasoningFilterMenuOptions: readonly ReasoningFilterMenuOption[] =
  [
    {
      label: "earthquake",
      value: "twitter",
      type: "channel",
    },
    {
      label: "provisions",
      value: "erzak",
      type: "reason",
    },
    {
      label: "confirmed",
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

export const getReasoningFilter = (
  reasoningFilterMenuOption: ReasoningFilterMenuOption
) => {
  reasoningFilterMenuOption.type;
  if (reasoningFilterMenuOption.type === "channel") {
    return undefined;
  }

  if (reasoningFilterMenuOption.type === "reason") {
    return reasoningFilterMenuOption.value;
  }
};

const ReasoningFilterMenu: React.FC<FilterReasoningMenuProps> = ({
  onChange,
}) => {
  const { t } = useTranslation("home");
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
        {t(
          `filter.reason.${
            reasoningFilterMenuOptions.find(
              (option) => option.value === selectedValue
            )?.label
          }`
        )}
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {reasoningFilterMenuOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={handleMenuItemClick}
            data-value={option.value}
            disableRipple
          >
            {t(`filter.reason.${option.label}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ReasoningFilterMenu;
