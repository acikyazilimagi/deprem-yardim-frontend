import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import FilterMenuButton from "./FilterMenuButton";
import { useTranslation } from "next-i18next";
import { FilterOptions, TimeOption, valueToOption } from "@/utils/filterTime";
import { computeTimestamp } from "@/utils/filterTime";

export type FilterTimeMenuProps = {
  onChangeTime: (_newerThanTimestamp?: number) => void;
  shouldFetchNextOption: Boolean;
  resetShouldFetchNextOption: Function;
};

const FilterTimeMenu: React.FC<FilterTimeMenuProps> = ({
  onChangeTime,
  shouldFetchNextOption,
  resetShouldFetchNextOption,
}) => {
  const { t } = useTranslation("home");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] =
    useState<TimeOption>("last30Minutes");
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
    let currentOptionIndex = FilterOptions.findIndex(
      (option) => option.value === selectedValue
    );

    if (shouldFetchNextOption && selectedValue !== "all") {
      setSelectedValue(FilterOptions[currentOptionIndex + 1].value);
      // FIXME: setting shouldFetchNextOption when it is a dependency of this hook, this may be causing issues
      resetShouldFetchNextOption();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchNextOption]);

  useEffect(() => {
    const option = valueToOption(selectedValue);

    if (!option) return;
    if (option.inMilliseconds === -1) {
      onChangeTime(undefined);
    } else {
      onChangeTime(computeTimestamp(option));
    }
  }, [onChangeTime, selectedValue]);

  return (
    <>
      <FilterMenuButton
        ariaControls={"zaman-filtrele"}
        open={open}
        onClick={handleClick}
      >
        {t(
          `filter.time.${
            FilterOptions.find((option) => option.value === selectedValue)
              ?.label
          }`
        )}
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {FilterOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={handleMenuItemClick}
            data-value={option.value}
            disableRipple
          >
            {t(`filter.time.${option.label}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterTimeMenu;
