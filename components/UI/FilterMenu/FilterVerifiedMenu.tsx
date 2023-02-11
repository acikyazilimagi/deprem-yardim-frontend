import { Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import FilterMenuButton from "./FilterMenuButton";

type FilterOption = {
  label: string;
  value: boolean;
};

export type FilterVerifiedMenuProps = {
  onChange: (_newVerifyStatus: boolean) => void;
};

const FilterOptions: readonly FilterOption[] = [
  {
    label: "verified",
    value: true,
  },
  {
    label: "unVerified",
    value: false,
  },
] as const;

const FilterVerifiedMenu: React.FC<FilterVerifiedMenuProps> = ({
  onChange,
}) => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<boolean>(true);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (typeof event.currentTarget.dataset.value === "undefined") return;
    const value = event.currentTarget.dataset.value === "true";

    setSelectedValue(value);
    handleClose();
  };

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue, onChange]);

  return (
    <>
      <FilterMenuButton
        onClick={handleClick}
        ariaControls={"verified-filtrele"}
        open={open}
      >
        {t(
          `filter.verified.${
            FilterOptions.find((option) => option.value === selectedValue)
              ?.label
          }`
        )}
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {FilterOptions.map((option, i) => (
          <MenuItem
            key={i}
            onClick={handleMenuItemClick}
            data-value={option.value}
            disableRipple
          >
            {t(`filter.verified.${option.label}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { FilterVerifiedMenu };
