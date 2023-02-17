import { useEffect, useState, MouseEvent, ReactElement } from "react";
import { Menu, MenuItem } from "@mui/material";
import FilterMenuButton from "./FilterMenuButton";
import { useTranslation } from "next-i18next";

export type FilterMenuOption<ValueType> = {
  label: string;
  value: ValueType;
};

export type FilterMenuProps<ValueType> = {
  onChange: (_option: ValueType) => void;
  initialValue: ValueType;
  menuOptions: FilterMenuOption<ValueType>[];
  translationPath: string;
};

function CommonFilterMenu<ValueType>({
  onChange,
  initialValue,
  menuOptions,
  translationPath,
}: FilterMenuProps<ValueType>): ReactElement {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<ValueType>(initialValue);
  const { t } = useTranslation("home");
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: MouseEvent<HTMLLIElement>) => {
    const value = (event.currentTarget.dataset.value ?? null) as ValueType;
    setSelectedValue(value);
    handleClose();
  };

  useEffect(() => {
    onChange(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);
  const selectedLabel = menuOptions.find(
    (option) => option.value === selectedValue
  )?.label;
  return (
    <>
      <FilterMenuButton
        open={open}
        onClick={handleClick}
        ariaControls={`${translationPath}-filtrele`}
      >
        {t(`${translationPath}.${selectedLabel}`).toUpperCase()}
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuOptions.map((option) => (
          <MenuItem
            key={option.label}
            onClick={handleMenuItemClick}
            data-value={option.value}
            disableRipple
          >
            {t(`${translationPath}.${option.label}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default CommonFilterMenu;
