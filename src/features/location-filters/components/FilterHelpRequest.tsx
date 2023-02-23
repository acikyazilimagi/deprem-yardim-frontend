import { Filter } from "@/components/Filter/Filter";
import { FilterHeader } from "@/components/Filter/FilterHeader";
import { useTranslation } from "next-i18next";
import { FilterControl } from "@/components/Filter/FilterControl";
import { FilterOptions } from "@/utils/filterTime";
import { MenuItem } from "@mui/material";
import {
  useHelpRequestFilter,
  filters as helpRequestFilters,
  HelpRequestCategory,
} from "../stores/useHelpRequestFilter";

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
        onChange={(_e, selectedCategories) => {
          if (Array.isArray(selectedCategories)) {
            actions.setSelectedCategories(
              selectedCategories as HelpRequestCategory[]
            );
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

      <FilterControl<number>
        value={timestamp ?? 0}
        label={t("filter.timestampTitle")}
        onChange={(_e, selected) => {
          actions.setTimestamp(selected);
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
