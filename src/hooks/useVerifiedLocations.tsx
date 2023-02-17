import {
  APIChannel,
  APILocationChannel,
  APISingleDataChannel,
  AhbapData,
  AhbapResponse,
  BabalaData,
  FoodData,
  FoodResponse,
  HospitalData,
  HospitalResponse,
  PharmacyData,
  PharmacyResponse,
  RT,
  RTSingleData,
  SafePlaceData,
  SafePlaceResponse,
  SahraData,
  SahraResponse,
  SatelliteData,
  SatelliteResponse,
  TeleteyitData,
  TeleteyitResponse,
  TwitterData,
  TwitterResponse,
} from "@/types";
import useLocation from "./useLocation";
import { BabalaResponse } from "../types/index";

// TODO: PUT THESE HOOKS INTO THEIR OWN FILES
// TODO: Remove this hook and use hooks defined above in relevant components

const transformFoodResponse: RT<FoodResponse, FoodData> = (res) => {
  return {
    channel: "yemek",
    geometry: {
      location: {
        lat: res.loc[1],
        lng: res.loc[0],
      },
    },
    properties: {
      name: res.extraParams.name,
      description: res.extraParams.description,
      type: res.extraParams.styleUrl,
      icon: res.extraParams.icon,
    },
  };
};

const transformAhbapResponse: RT<AhbapResponse, AhbapData> = (res) => {
  return {
    channel: "ahbap",
    geometry: {
      location: {
        lat: res.loc[1],
        lng: res.loc[0],
      },
    },
    properties: {
      name: res.extraParams.name,
      description: res.extraParams.description,
      type: res.extraParams.styleUrl,
      icon: res.extraParams.icon,
    },
  };
};

const transformHospitalResponse: RT<HospitalResponse, HospitalData> = (res) => {
  return {
    channel: "hastane",
    geometry: {
      location: {
        lat: res.loc[1],
        lng: res.loc[0],
      },
    },
    properties: {
      name: res.extraParams.name,
      icon: "images/icon-10.png",
      city: res.extraParams.il,
    },
  };
};

const transformTeleteyitResponse: RT<TeleteyitResponse, TeleteyitData> = (
  res
) => {
  return {
    channel: "teleteyit",
    geometry: {
      location: {
        lat: res.loc[1],
        lng: res.loc[0],
      },
    },
    properties: {
      name: res.extraParams["isim-soyisim"],
      description: res.extraParams.aciklama,
      icon: "images/icon-14.png",
      id: res.id,
      reason: res.reason,
      city: res.extraParams.il,
      district: res.extraParams.ilce,
      status: res.extraParams.durum,
    },
  };
};

const transformSatelliteResponse: RT<SatelliteResponse, SatelliteData> = (
  res
) => {
  return {
    channel: "uydu",
    geometry: {
      location: {
        lat: res.loc[1],
        lng: res.loc[0],
      },
    },
    properties: {
      damage: res.extraParams.damage,
      verified: res.is_location_verified,
      icon: "images/icon-13.png",
    },
  };
};

const transformSahraResponse: RT<SahraResponse, SahraData> = (res) => {
  return {
    channel: "sahra",
    geometry: {
      location: {
        lat: res.loc[1],
        lng: res.loc[0],
      },
    },
    properties: {
      id: res.id,
      name: res.extraParams.name,
      reason: res.reason,
      icon: res.extraParams.icon,
      verified: res.is_location_verified,
    },
  };
};

const transformPharmacyResponse: RT<PharmacyResponse, PharmacyData> = (res) => {
  return {
    channel: "eczane",
    geometry: {
      location: {
        lat: res.loc[1],
        lng: res.loc[0],
      },
    },
    properties: {
      id: res.id,
      name: res.extraParams.name,
      reason: res.reason,
      icon: res.extraParams.icon,
      verified: res.is_location_verified,
    },
  };
};

const transformSafePlaceResponse: RT<SafePlaceResponse, SafePlaceData> = (
  res
) => {
  return {
    channel: "guvenli",
    geometry: {
      location: {
        lat: res.loc[1],
        lng: res.loc[0],
      },
    },
    properties: {
      verified: res.is_location_verified,
      description: res.extraParams.description,
      id: res.entry_id,
      icon: "images/icon-16.png",
      reason: res.reason,
      name: res.extraParams.name,
    },
  };
};

export const trasformLocationResponses: Record<APILocationChannel, RT> = {
  ahbap_location: transformAhbapResponse as RT,
  eczane_excel: transformPharmacyResponse as RT,
  guvenli_yerler_oteller: transformSafePlaceResponse as RT,
  hastahane_locations: transformHospitalResponse as RT,
  sahra_mutfak: transformSahraResponse as RT,
  sicak_yemek: transformFoodResponse as RT,
  teleteyit: transformTeleteyitResponse as RT,
  turk_eczane: transformPharmacyResponse as RT,
  uydu: transformSatelliteResponse as RT,
};

const transformTwitterResponse: RTSingleData<TwitterResponse, TwitterData> = (
  res
) => {
  return {
    channel: "twitter",
    properties: {
      full_text: res.full_text,
      reason: res.reason,
    },
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
  };
};

const transformBabalaResponse: RTSingleData<BabalaResponse, BabalaData> = (
  res
) => {
  return {
    channel: "babala",
    properties: {
      name_surname: res.extraParams.name_surname,
      tel: res.extraParams.tel,
      additional_notes: res.extraParams.additional_notes,
      status: res.extraParams.status,
      manual_confirmation: res.extraParams.manual_confirmation,
      reason: res.reason,
      full_text: res.full_text,
    },
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
  };
};

export const transformSingleDataResponses: Record<
  APISingleDataChannel,
  RTSingleData
> = {
  twitter: transformTwitterResponse as RTSingleData,
  babala: transformBabalaResponse as RTSingleData,
};

export function useVerifiedLocations() {
  const foodLocations = useLocation(["sicak_yemek"], "yemek", {
    transformResponse: transformFoodResponse as RT,
  });

  const ahbapLocations = useLocation(["ahbap_location"], "ahbap", {
    transformResponse: transformAhbapResponse as RT,
  });

  const hospitalLocations = useLocation(["hastahane_locations"], "hastane", {
    transformResponse: transformHospitalResponse as RT,
  });

  const teleteyitLocations = useLocation(["teleteyit"], "teleteyit", {
    transformResponse: transformTeleteyitResponse as RT,
  });

  const satelliteLocations = useLocation(["uydu"], "uydu", {
    transformResponse: transformSatelliteResponse as RT,
  });

  const sahraKitchenLocations = useLocation(["sahra_mutfak"], "sahra", {
    transformResponse: transformSahraResponse as RT,
  });

  const pharmacyLocations = useLocation(
    ["eczane_excel", "turk_eczane"],
    "eczane",
    { transformResponse: transformPharmacyResponse as RT }
  );

  const safePlaceLocations = useLocation(
    ["guvenli_yerler_oteller"],
    "guvenli",
    { transformResponse: transformSafePlaceResponse as RT }
  );

  return {
    foodLocations,
    ahbapLocations,
    hospitalLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    safePlaceLocations,
  };
}
