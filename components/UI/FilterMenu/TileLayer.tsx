import { useEffect, useState, MouseEvent } from "react";
import { Menu, MenuItem } from "@mui/material";
import FilterMenuButton from "./FilterMenuButton";
import { useTranslation } from "react-i18next";

export const tileLayerMenuOptions: readonly TileLayerMenuOption[] = [
  {
    label: "map",
    value: "m",
  },
  {
    label: "satellite",
    value: "s",
  },
] as const;

export const initialTileLayer = tileLayerMenuOptions[0];

export interface TileLayerMenuOption {
  label: string;
  value: string;
}

const valueToOption = (value: string): TileLayerMenuOption => {
  return tileLayerMenuOptions.find(
    (option) => option.value === value
  ) as TileLayerMenuOption;
};

export interface TileLayerMenuProps {
  onChange: (_option: TileLayerMenuOption) => void;
}

const TileLayerMenu: React.FC<TileLayerMenuProps> = ({ onChange }) => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>(
    initialTileLayer.value
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
          `map.base.${
            tileLayerMenuOptions.find(
              (option) => option.value === selectedValue
            )?.label
          }`
        )}
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {tileLayerMenuOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={handleMenuItemClick}
            data-value={option.value}
            disableRipple
          >
            {t(`map.base.${option.label}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TileLayerMenu;
