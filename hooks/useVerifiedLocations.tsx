import {
  AHBAP_LOCATIONS_URL,
  HOSPITAL_LOCATIONS_URL,
  FOOD_URL,
  TELETEYIT_URL,
} from "@/utils/constants";
import useSWR from "swr";
import { dataFetcher } from "@/services/dataFetcher";
import dJSON from "dirty-json";
import { useState } from "react";

export function useVerifiedLocations() {
  const [foodLocations, setFoodLocations] = useState<any[]>([]);
  const [ahbapLocations, setAhbapLocations] = useState<any[]>([]);
  const [hospitalLocations, setHospitalLocations] = useState<any[]>([]);
  const [teleteyitLocations, setTeleteyitLocations] = useState<any[]>([]);

  useSWR(FOOD_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const features = data.results.map((item: any) => {
        let extra_params = {};
        try {
          extra_params = dJSON.parse(item.extra_parameters);
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

      setFoodLocations(features);
    },
  });

  useSWR(AHBAP_LOCATIONS_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const features = data.results.map((item: any) => {
        let extra_params = {};
        try {
          extra_params = dJSON.parse(item.extra_parameters);
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
          extra_params = dJSON.parse(
            item.extra_parameters?.replaceAll("nan", false)
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

  useSWR(TELETEYIT_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const features = data.results.map((item: any) => {
        let extra_params = {};

        try {
          extra_params = dJSON.parse(
            item?.extra_parameters.replaceAll("nan", false)
          );
          extra_params = {
            ...extra_params,
            icon: "images/icon-12.png",
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

      setTeleteyitLocations(features);
    },
  });

  return {
    foodLocations,
    ahbapLocations,
    hospitalLocations,
    teleteyitLocations,
  };
}
