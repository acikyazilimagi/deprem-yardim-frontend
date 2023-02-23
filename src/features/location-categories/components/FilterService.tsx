import { Filter } from "@/components/Filter/Filter";
import { FilterHeader } from "@/components/Filter/FilterHeader";
import { useTranslation } from "next-i18next";
import { FilterControl } from "@/components/Filter/FilterControl";
import { MenuItem } from "@mui/material";
import {
  useServiceFilter,
  filters as serviceFilters,
  ServiceCategory,
} from "../stores/useServiceFilter";

export const FilterService = () => {
  const { t } = useTranslation("home");
  const { isOpen, actions, selectedCategories } = useServiceFilter();

  console.log({ selectedCategories });

  if (!isOpen) {
    return null;
  }

  return (
    <Filter
      isOpen={isOpen}
      header={
        <FilterHeader
          title={t("filter.servicesTitle")}
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
          console.log({ selectedCategories });
          if (Array.isArray(selectedCategories)) {
            actions.setSelectedCategories(
              selectedCategories as ServiceCategory[]
            );
          }
        }}
      >
        {Object.entries(serviceFilters).map(([key, option]) => {
          return (
            <MenuItem key={key} value={option.type}>
              {t(`filter.category.${option.type}`)}
            </MenuItem>
          );
        })}
      </FilterControl>
    </Filter>
  );
};
