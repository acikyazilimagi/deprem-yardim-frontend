import { Filter } from "@/components/Filter/Filter";
import { FilterHeader } from "@/components/Filter/FilterHeader";
import { useTranslation } from "next-i18next";
import { FilterControl } from "@/components/Filter/FilterControl";
import { FilterOptions } from "@/utils/filterTime";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import {
  useHelpRequestFilter,
  helpRequestFilters as helpRequestFilters,
  HelpRequestCategory,
} from "./useHelpRequestFilter";

export const FilterHelpRequest = () => {
  const { t } = useTranslation("home");
  const { timestamp, isOpen, actions, selectedCategories } =
    useHelpRequestFilter();

  if (!isOpen) {
    return null;
  }

  return (
    <Filter
      isOpen={isOpen}
      header={
        <FilterHeader
          title={t("filter.helpRequestTitle")}
          onClose={() => {
            actions.setIsOpen(false);
          }}
        />
      }
    >
      <FilterControl
        multiple
        value={selectedCategories}
        label={t("filter.reasonsTitle")}
        onChange={(event: SelectChangeEvent<HelpRequestCategory[]>) => {
          const { value } = event.target;
          if (Array.isArray(value) && value.length) {
            actions.setSelectedCategories(value);
          }
        }}
      >
        {Object.entries(helpRequestFilters).map(([key, option]) => {
          return (
            <MenuItem key={key} value={option.type}>
              {t(`filter.category.${option.type}`)}
            </MenuItem>
          );
        })}
      </FilterControl>

      <FilterControl
        value={timestamp}
        label={t("filter.timestampTitle")}
        onChange={(event: SelectChangeEvent<number>) => {
          const { value } = event.target;
          if (typeof value === "number") {
            actions.setTimestamp(value);
          }
        }}
      >
        {FilterOptions.map((option, idx) => {
          return (
            <MenuItem key={idx} value={option.inMilliseconds}>
              {t(`filter.time.${option.label}`)}
            </MenuItem>
          );
        })}
      </FilterControl>
    </Filter>
  );
};
