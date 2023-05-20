import { Filter } from "@/components/Filter/Filter";
import { FilterHeader } from "@/components/Filter/FilterHeader";
import { useTranslation } from "next-i18next";
import { FilterControl } from "@/components/Filter/FilterControl";
import { FilterOptions } from "@/utils/filterTime";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { useVotingLocations } from "./useVotingLocations";

import cities from "@/data/tr-cities.json";
import cityDistricts from "@/data/tr-city-districts.json";

const getDistricts = (cityID: number) => {
  return cityDistricts.filter((district) => district.cityID === cityID);
};

export const FilterVotingLocations = () => {
  const { t } = useTranslation("home");
  const {
    isOpen,
    actions,
    selectedCity,
    selectedDistrict,
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
          title={t("filter.findVotingLocationsTitle")}
          onClose={() => {
            actions.setIsOpen(false);
          }}
        />
      }
    >
      <FilterControl
        value={selectedCity?.id}
        label={t("filter.city")}
        onChange={(event: SelectChangeEvent<number>) => {
          const { value } = event.target;
          if (typeof value !== "number") return;
          actions.setSelectedCity({ id: value });
        }}
      >
        {cities.map((city) => {
          return (
            <MenuItem key={city.id} value={city.id ?? ""}>
              {city.name}
            </MenuItem>
          );
        })}
      </FilterControl>

      <FilterControl
        disabled={!selectedCity?.id}
        value={selectedDistrict?.id ?? ""}
        label={t("filter.district")}
        onChange={(event: SelectChangeEvent<number>) => {
          const { value } = event.target;

          if (typeof value !== "number") return;

          actions.setSelectedDistrict({ id: value });
        }}
      >
        {selectedCity?.id &&
          getDistricts(selectedCity?.id).map((district) => {
            return (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            );
          })}
      </FilterControl>

      <FilterControl
        disabled={!selectedDistrict?.id}
        value={selectedNeighborhoodId ?? ""}
        label={t("filter.neighborhood")}
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
        disabled={!selectedNeighborhoodId}
        value={selectedSchoolId ?? ""}
        label={t("filter.school")}
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
