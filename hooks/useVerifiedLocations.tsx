import { AHBAP_LOCATIONS_URL, HOSPITAL_LOCATIONS_URL } from "@/utils/constants";
import useSWR from "swr";
import { dataFetcher } from "@/services/dataFetcher";
import { useState } from "react";

export function useVerifiedLocations() {
  const [ahbapLocations, setAhbapLocations] = useState<any[]>([]);
  const [hospitalLocations, setHospitalLocations] = useState<any[]>([]);

  useSWR(AHBAP_LOCATIONS_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const features = data.results.map((item: any) => {
        let extra_params = {};
        try {
          extra_params = JSON.parse(
            item.extra_parameters?.replaceAll("'", '"').replaceAll("\\xa0", "")
          );
        } catch (error) {
          console.error(error);
        }

        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: item.loc?.reverse(),
          },
          properties: extra_params,
        };
      });

      setAhbapLocations(features);
    },
  });

  useSWR(HOSPITAL_LOCATIONS_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const features = data.results.map((item: any) => {
        let extra_params = {};
        try {
          extra_params = JSON.parse(
            item.extra_parameters
              ?.replaceAll("'", '"')
              .replaceAll("nan", false)
              .replaceAll("\\xa0", "")
          );
          extra_params = {
            ...extra_params,
            icon: "images/icon-10.png",
          };
        } catch (error) {
          console.error(error);
        }

        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: item.loc?.reverse(),
          },
          properties: extra_params,
        };
      });

      setHospitalLocations(features);
    },
  });

  return {
    ahbapLocations,
    hospitalLocations,
  };
}
