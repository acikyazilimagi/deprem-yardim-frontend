import { useEffect, useState } from "react";
import {
  AHBAP_LOCATIONS_URL,
  HOSPITAL_LOCATIONS_URL,
  FOOD_URL,
  TELETEYIT_URL,
  SATELLITE_URL,
  SAHRA_KITCHEN_URL,
  PHARMACY_URL,
  SAFE_PLACES_URL,
} from "@/utils/constants";
import useSWR from "swr";
import { dataFetcher } from "@/services/dataFetcher";
import dJSON from "dirty-json";
import { PartialDataError } from "@/errors";
import { useSnackbar } from "@/components/base/Snackbar";
import { useTranslation } from "next-i18next";

// @fdemir code begin =======
type HandleLocationResponseOptions = {
  extraParamsIcon?: string;
};

const handleLocationResponse = (
  data: any,
  setLocations: any,
  options: HandleLocationResponseOptions = {}
) => {
  if (!data) return;

  const features = data.results.map((item: any) => {
    let extra_params = {};
    try {
      extra_params = dJSON.parse(
        item.extra_parameters?.replaceAll("nan", false)
      );

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
// @fdemir code end =======

// TODO: PUT THESE HOOKS INTO THEIR OWN FILES
export function useFoodLocations(setErrors: any) {
  const [foodLocations, setFoodLocations] = useState<any[]>([]);
  useSWR(FOOD_URL, dataFetcher, {
    onSuccess: (data) => handleLocationResponse(data, setFoodLocations),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return foodLocations;
}

export function useAhbapLocations(setErrors: any) {
  const [ahbapLocations, setAhbapLocations] = useState<any[]>([]);
  useSWR(AHBAP_LOCATIONS_URL, dataFetcher, {
    onSuccess: (data) => handleLocationResponse(data, setAhbapLocations),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return ahbapLocations;
}

export function useHospitalLocations(setErrors: any) {
  const [hospitalLocations, setHospitalLocations] = useState<any[]>([]);
  useSWR(HOSPITAL_LOCATIONS_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setHospitalLocations, {
        extraParamsIcon: "images/icon-10.png",
      }),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return hospitalLocations;
}

export function useTeleteyitLocations(setErrors: any) {
  const [teleteyitLocations, setTeleteyitLocations] = useState<any[]>([]);
  useSWR(TELETEYIT_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setTeleteyitLocations, {
        extraParamsIcon: "images/icon-12.png",
      }),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return teleteyitLocations;
}

export function useVerifiedLocations() {
  const [satelliteLocations, setSatelliteLocations] = useState<any[]>([]);
  const [sahraKitchenLocations, setSahraKitchenLocations] = useState<any[]>([]);
  const [pharmacyLocations, setPharmacyLocations] = useState<any[]>([]);
  const [safePlaceLocations, setSafePlaceLocations] = useState<any[]>([]);
  const [errors, setErrors] = useState<Error[]>([]);

  const foodLocations = useFoodLocations(setErrors);
  const ahbapLocations = useAhbapLocations(setErrors);
  const hospitalLocations = useHospitalLocations(setErrors);
  const teleteyitLocations = useTeleteyitLocations(setErrors);

  const { enqueueWarning } = useSnackbar();
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    errors.length && enqueueWarning(t("common:errors.partialData"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useSWR(SATELLITE_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const satelliteData = data.results.map((item: any) => {
        let extra_params = {};

        try {
          extra_params = dJSON.parse(
            item.extra_parameters?.replaceAll("nan", false)
          );
          extra_params = {
            ...extra_params,
            icon: "images/icon-13.png",
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

      setSatelliteLocations(satelliteData);
    },
    onError: () => {
      setErrors((errors) => [...errors, new PartialDataError()]);
    },
  });

  useSWR(SAHRA_KITCHEN_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const sahraKitchenData = data.results.map((item: any) => {
        let extra_params = {};

        try {
          extra_params = dJSON.parse(
            item.extra_parameters?.replaceAll("nan", false)
          );
          extra_params = {
            ...extra_params,
            icon: "images/icon-14.png",
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
          id: item.id,
          properties: extra_params,
          reason: item.reason,
          verified: item.is_location_verified,
        };
      });

      setSahraKitchenLocations(sahraKitchenData);
    },
    onError: () => {
      setErrors((errors) => [...errors, new PartialDataError()]);
    },
  });
  useSWR(PHARMACY_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const pharmcayData = data.results.map((item: any) => {
        let extra_params = {};

        try {
          extra_params = dJSON.parse(
            item.extra_parameters?.replaceAll("nan", false)
          );
          extra_params = {
            ...extra_params,
            icon: "images/icon-15.png",
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
          reason: item.reason,
          verified: item.is_location_verified,
          id: item.id,
        };
      });

      setPharmacyLocations(pharmcayData);
    },
    onError: () => {
      setErrors((errors) => [...errors, new PartialDataError()]);
    },
  });
  useSWR(SAFE_PLACES_URL, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const safePLacesData = data.results.map((item: any) => {
        let extra_params = {};

        try {
          extra_params = dJSON.parse(
            item.extra_parameters?.replaceAll("nan", false)
          );
          extra_params = {
            ...extra_params,
            icon: "images/icon-16.png",
          };
        } catch (error) {
          console.error(error);
        }

        return {
          id: item.id,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: item.loc?.reverse(),
          },
          properties: {
            ...extra_params,
            verified: item.is_location_verified,
            reason: item.reason,
          },
        };
      });

      setSafePlaceLocations(safePLacesData);
    },
    onError: () => {
      setErrors((errors) => [...errors, new PartialDataError()]);
    },
  });

  return {
    foodLocations,
    ahbapLocations,
    hospitalLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    safePlaceLocations,
    errors,
  };
}
