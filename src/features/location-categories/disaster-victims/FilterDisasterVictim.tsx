import { Filter } from "@/components/Filter/Filter";
import { FilterHeader } from "@/components/Filter/FilterHeader";
import { useTranslation } from "next-i18next";
import { FilterControl } from "@/components/Filter/FilterControl";
import { FilterOptions } from "@/utils/filterTime";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useDisasterVictimFilter } from "./useDisasterVictimFilter";

export const FilterDisasterVictim = () => {
  const { t } = useTranslation("home");
  const { timestamp, isOpen, actions } = useDisasterVictimFilter();

  if (!isOpen) {
    return null;
  }

  return (
    <Filter
      isOpen={isOpen}
      header={
        <FilterHeader
          title={t("filter.disasterVictimTitle")}
          onClose={() => {
            actions.setIsOpen(false);
          }}
        />
      }
    >
      <FilterControl
        value={timestamp ?? 0}
        label={t("filter.timestampTitle")}
        onChange={(event: SelectChangeEvent<number>) => {
          const { value } = event.target;
          if (typeof value === "number") {
            actions.setTimestamp(value);
          }
        }}
      >
        {FilterOptions.map((option) => {
          return (
            <MenuItem key={option.value} value={option.inMilliseconds}>
              {t(`filter.time.${option.label}`)}
            </MenuItem>
          );
        })}
      </FilterControl>
    </Filter>
  );
};
