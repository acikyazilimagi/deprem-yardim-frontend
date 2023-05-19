import { Filter } from "@/components/Filter/Filter";
import { FilterHeader } from "@/components/Filter/FilterHeader";
import { useTranslation } from "next-i18next";
import { FilterControl } from "@/components/Filter/FilterControl";
import { FilterOptions } from "@/utils/filterTime";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useVotingLocations } from "./useVotingLocations";

const cityTransformer = (id: number): string => {
  return id.toString();
};

export const FilterHelpRequest = () => {
  const { t } = useTranslation("home");
  const {
    isOpen,
    actions,
    selectedCityId,
    selectedDistrictId,
    selectedNeighborhoodId,
    selectedSchoolId,
  } = useVotingLocations();

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
        value={selectedCityId}
        label={t("filter.selectedCityId")}
        onChange={(event: SelectChangeEvent<number>) => {
          const { value } = event.target;

          if (typeof value !== "number") return;

          actions.setSelectedCityId(value);
        }}
      >
        {FilterOptions.map((option, idx) => {
          return (
            <MenuItem key={idx} value={option.inMilliseconds}>
              {/* cityTransformer */}
              {/* We don't know data yet but it should be city.name */}
              {t(`filter.time.${option.label}`)}
            </MenuItem>
          );
        })}
      </FilterControl>

      <FilterControl
        value={selectedDistrictId}
        label={t("filter.selectedDistrictId")}
        onChange={(event: SelectChangeEvent<number>) => {
          const { value } = event.target;

          if (typeof value !== "number") return;

          actions.setSelectedDistrictId(value);
        }}
      >
        {FilterOptions.map((option, idx) => {
          return (
            <MenuItem key={idx} value={option.inMilliseconds}>
              {/* cityTransformer */}
              {/* We don't know data yet but it should be city.name */}
              {t(`filter.time.${option.label}`)}
            </MenuItem>
          );
        })}
      </FilterControl>

      <FilterControl
        value={selectedNeighborhoodId}
        label={t("filter.selectedNeighborhoodId")}
        onChange={(event: SelectChangeEvent<number>) => {
          const { value } = event.target;

          if (typeof value !== "number") return;

          actions.setSelectedNeighborhoodId(value);
        }}
      >
        {FilterOptions.map((option, idx) => {
          return (
            <MenuItem key={idx} value={option.inMilliseconds}>
              {/* cityTransformer */}
              {/* We don't know data yet but it should be city.name */}
              {t(`filter.time.${option.label}`)}
            </MenuItem>
          );
        })}
      </FilterControl>

      <FilterControl
        value={selectedSchoolId}
        label={t("filter.selectedSchoolId")}
        onChange={(event: SelectChangeEvent<number>) => {
          const { value } = event.target;

          if (typeof value !== "number") return;

          actions.setSelectedSchoolId(value);
        }}
      >
        {FilterOptions.map((option, idx) => {
          return (
            <MenuItem key={idx} value={option.inMilliseconds}>
              {/* cityTransformer */}
              {/* We don't know data yet but it should be city.name */}
              {t(`filter.time.${option.label}`)}
            </MenuItem>
          );
        })}
      </FilterControl>
    </Filter>
  );
};
