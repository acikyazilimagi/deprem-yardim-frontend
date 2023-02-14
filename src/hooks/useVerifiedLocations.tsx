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
  getExtraParams?: any;
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

      if (options?.getExtraParams) {
        extra_params = {
          ...extra_params,
          ...options.getExtraParams(item),
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
        getExtraParams: () => ({ icon: "images/icon-10.png" }),
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
        getExtraParams: () => ({ icon: "images/icon-12.png" }),
      }),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return teleteyitLocations;
}

export function useSatelliteLocations(setErrors: any) {
  const [satelliteLocations, setSatelliteLocations] = useState<any[]>([]);
  useSWR(SATELLITE_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setSatelliteLocations, {
        getExtraParams: () => ({ icon: "images/icon-13.png" }),
      }),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return satelliteLocations;
}

const getSahraExtraParams = (item: any) => ({
  icon: "images/icon-14.png",
  id: item.id,
  properties: item.properties,
  reason: item.reason,
});

export function useSahraKitchenLocations(setErrors: any) {
  const [sahraKitchenLocations, setSahraKitchenLocations] = useState<any[]>([]);
  useSWR(SAHRA_KITCHEN_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setSahraKitchenLocations, {
        getExtraParams: getSahraExtraParams,
      }),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return sahraKitchenLocations;
}

const getPharmacyExtraParams = (item: any) => ({
  icon: "images/icon-15.png",
  id: item.id,
  properties: item.properties,
  reason: item.reason,
  verified: item.is_location_verified,
});

export function usePharmacyLocations(setErrors: any) {
  const [pharmacyKitchenLocations, setPharmacyKitchenLocations] = useState<
    any[]
  >([]);

  useSWR(PHARMACY_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setPharmacyKitchenLocations, {
        getExtraParams: getPharmacyExtraParams,
      }),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return pharmacyKitchenLocations;
}

export function useSafePlaceLocations(setErrors: any) {
  const [safePlaceLocations, setSafePlaceLocations] = useState<any[]>([]);
  useSWR(SAFE_PLACES_URL, dataFetcher, {
    onSuccess: (data) =>
      handleLocationResponse(data, setSafePlaceLocations, {
        getExtraParams: () => ({ icon: "images/icon-16.png" }),
      }),
    onError: () => {
      setErrors((errors: any) => [...errors, new PartialDataError()]);
    },
  });
  return safePlaceLocations;
}

// TODO: Remove this hook and use hooks defined above in relevant components
export function useVerifiedLocations() {
  const [errors, setErrors] = useState<Error[]>([]);

  const foodLocations = useFoodLocations(setErrors);
  const ahbapLocations = useAhbapLocations(setErrors);
  const hospitalLocations = useHospitalLocations(setErrors);
  const teleteyitLocations = useTeleteyitLocations(setErrors);
  const satelliteLocations = useSatelliteLocations(setErrors);
  const sahraKitchenLocations = useSahraKitchenLocations(setErrors);
  const pharmacyLocations = usePharmacyLocations(setErrors);
  const safePlaceLocations = useSafePlaceLocations(setErrors);

  const { enqueueWarning } = useSnackbar();
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    errors.length && enqueueWarning(t("common:errors.partialData"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

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
