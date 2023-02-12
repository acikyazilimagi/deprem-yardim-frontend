import { useEffect, useState, MouseEvent } from "react";
import { Menu, MenuItem } from "@mui/material";
import FilterMenuButton from "./FilterMenuButton";
import { useTranslation } from "next-i18next";
import { useURLActions } from "@/stores/urlStore";

export const reasonFilterMenuOptions: readonly ReasonFilterMenuOption[] = [
  { label: "all", value: null },
  { label: "shelter", value: "barinma" },
  { label: "electronics", value: "elektronik" },
  { label: "wreckage", value: "enkaz" },
  { label: "provisions", value: "erzak" },
  { label: "clothes", value: "giysi" },
  { label: "safe-points", value: "guvenli-noktalar" },
  { label: "animal-theraphy", value: "hayvanlar-icin-tedavi" },
  { label: "accomodation", value: "konaklama" },
  { label: "rescue", value: "kurtarma" },
  { label: "logistics", value: "lojistik" },
  { label: "water", value: "su" },
  { label: "looting", value: "yagma" },
  { label: "food", value: "yemek" },
  { label: "saglik", value: "hastahane_locations" },
] as const;

export const [initialReasonFilter] = reasonFilterMenuOptions;

export interface ReasonFilterMenuOption {
  label: string;
  value: string | null;
}

const ReasonFilterMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(
    initialReasonFilter.value
  );
  const { setReasoningFilterMenuOption: onChange } = useURLActions();
  const { t } = useTranslation("home");
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
    onChange(selectedValue as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);
  const selectedLabel = selectedValue
    ? reasonFilterMenuOptions.find((option) => option.value === selectedValue)
        ?.label
    : initialReasonFilter.label;
  return (
    <>
      <FilterMenuButton
        open={open}
        onClick={handleClick}
        ariaControls="CHANGEME-filtrele"
      >
        {t(`filter.reasons.${selectedLabel}`)}
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {reasonFilterMenuOptions.map((option) => (
          <MenuItem
            key={option.label}
            onClick={handleMenuItemClick}
            data-value={option.value}
            disableRipple
          >
            {t(`filter.reasons.${option.label}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ReasonFilterMenu;
