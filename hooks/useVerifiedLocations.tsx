import { useEffect, useState } from "react";
import {
  AHBAP_LOCATIONS_URL,
  HOSPITAL_LOCATIONS_URL,
  FOOD_URL,
  TELETEYIT_URL,
  SATELLITE_URL,
  SAHRA_KITCHEN_URL,
  PHARMACY_URL,
} from "@/utils/constants";
import useSWR from "swr";
import { dataFetcher } from "@/services/dataFetcher";
import dJSON from "dirty-json";
import { PartialDataError } from "@/errors";
import { useSnackbar } from "@/components/base/Snackbar";
import { useTranslation } from "next-i18next";

export function useVerifiedLocations() {
  const [foodLocations, setFoodLocations] = useState<any[]>([]);
  const [ahbapLocations, setAhbapLocations] = useState<any[]>([]);
  const [hospitalLocations, setHospitalLocations] = useState<any[]>([]);
  const [teleteyitLocations, setTeleteyitLocations] = useState<any[]>([]);
  const [satelliteLocations, setSatelliteLocations] = useState<any[]>([]);
  const [sahraKitchenLocations, setSahraKitchenLocations] = useState<any[]>([]);
  const [pharmacyLocations, setPharmacyLocations] = useState<any[]>([]);
  const [errors, setErrors] = useState<Error[]>([]);

  const { enqueueWarning } = useSnackbar();
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    errors.length && enqueueWarning(t("common:errors.partialData"));
    // ts-expect-error adding enqueue warning rerenders
  }, [errors]);

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
    onError: () => {
      setErrors((errors) => [...errors, new PartialDataError()]);
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
    onError: () => {
      setErrors((errors) => [...errors, new PartialDataError()]);
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

    onError: () => {
      setErrors((errors) => [...errors, new PartialDataError()]);
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

    onError: () => {
      setErrors((errors) => [...errors, new PartialDataError()]);
    },
  });
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

  return {
    foodLocations,
    ahbapLocations,
    hospitalLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    errors,
  };
}
