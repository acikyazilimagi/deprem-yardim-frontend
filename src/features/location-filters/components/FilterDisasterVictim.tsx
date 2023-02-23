import { Filter } from "@/components/Filter/Filter";
import { FilterHeader } from "@/components/Filter/FilterHeader";
import { useDisasterVictimFilter } from "../stores/useDisasterVictimFilter";
import { useTranslation } from "next-i18next";
import { FilterControl } from "@/components/Filter/FilterControl";
import { FilterOptions } from "@/utils/filterTime";
import { MenuItem } from "@mui/material";

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
        onChange={(_e, selected) => {
          if (typeof selected === "string") {
            actions.setTimestamp(Date.now() - parseInt(selected));
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
