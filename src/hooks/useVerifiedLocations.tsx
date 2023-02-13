import {
  AHBAP_LOCATIONS_URL,
  HOSPITAL_LOCATIONS_URL,
  FOOD_URL,
  TELETEYIT_URL,
  SATELLITE_URL,
  SAHRA_MUTFAK_URL,
  PHARMACY_URL,
  SAFE_LOCATION_URL,
  DEPREM_IHTIYAC_URL,
} from "@/utils/constants";
import useSWR from "swr";
import { dataFetcher } from "@/services/dataFetcher";
import dJSON from "dirty-json";
import { useState } from "react";

type HandleLocationResponseOptions = {
  extraParamsIcon?: string;
};

const handleLocationResponse = (
  data: any,
  setLocations: (newData: any) => void,
  options: HandleLocationResponseOptions = {}
) => {
  if (!data) return;

  const features = data.results.map((item: any) => {
    let extra_params = {};
    try {
      extra_params = dJSON.parse(item.extra_parameters);

      if (options?.extraParamsIcon) {
        extra_params = {
          ...extra_params,
          icon: options.extraParamsIcon,
        };
      }
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

  setLocations(features);
};

export function useVerifiedLocations() {
  const [foodLocations, setFoodLocations] = useState<any[]>([]);
  const [ahbapLocations, setAhbapLocations] = useState<any[]>([]);
  const [hospitalLocations, setHospitalLocations] = useState<any[]>([]);
  const [teleteyitLocations, setTeleteyitLocations] = useState<any[]>([]);
  const [satelliteLocations, setSatelliteLocations] = useState<any[]>([]);

  const [sahraKitchenLocations, setSahraKitchenLocations] = useState<any[]>([]);
  const [pharmacyLocations, setPharmacyLocations] = useState<any[]>([]);
  const [safeLocations, setSafeLocations] = useState<any[]>([]);
  const [depremIhtiyacLocations, setDepremIhtiyacLocations] = useState<any[]>(
    []
  );

  useSWR(FOOD_URL, dataFetcher, {
    onSuccess: (data) => handleLocationResponse(data, setFoodLocations),
  });

  useSWR(AHBAP_LOCATIONS_URL, dataFetcher, {
    onSuccess: (data) => handleLocationResponse(data, setAhbapLocations),
  });

  useSWR(HOSPITAL_LOCATIONS_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setHospitalLocations, {
        extraParamsIcon: "images/icon-10.png",
      }),
  });

  useSWR(TELETEYIT_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setTeleteyitLocations, {
        extraParamsIcon: "images/icon-12.png",
      }),
  });

  useSWR(SATELLITE_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setSatelliteLocations, {
        extraParamsIcon: "images/icon-13.png",
      }),
  });

  useSWR(SAHRA_MUTFAK_URL, dataFetcher, {
    onSuccess: (data) => handleLocationResponse(data, setSahraKitchenLocations),
  });

  useSWR(PHARMACY_URL, dataFetcher, {
    onSuccess: (data) => handleLocationResponse(data, setPharmacyLocations),
  });

  useSWR(SAFE_LOCATION_URL, dataFetcher, {
    onSuccess: (data) => handleLocationResponse(data, setSafeLocations),
  });

  useSWR(DEPREM_IHTIYAC_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setDepremIhtiyacLocations),
  });

  return {
    foodLocations,
    ahbapLocations,
    hospitalLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    safeLocations,
    depremIhtiyacLocations,
  };
}
