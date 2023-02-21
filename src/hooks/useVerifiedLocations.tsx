import { useChannelFilterMenuOption } from "@/stores/urlStore";
import {
  AhbapData,
  AhbapResponse,
  APIChannel,
  APIResponseObject,
  BabalaData,
  BabalaResponse,
  FoodData,
  FoodResponse,
  Geometry,
  HospitalData,
  HospitalResponse,
  PharmacyData,
  PharmacyResponse,
  RT,
  SafePlaceData,
  SafePlaceResponse,
  SatelliteData,
  SatelliteResponse,
  TeleteyitData,
  TeleteyitResponse,
  TeyitEnkazData,
  TeyitEnkazResponse,
  TwitterData,
  TwitterResponse,
  DepremIOResponse,
  DepremIOData,
  TeyitYardimData,
  TeyitYardimResponse,
} from "@/types";
import useLocation from "./useLocation";

// TODO: PUT THESE HOOKS INTO THEIR OWN FILES
// TODO: MAKE THESE TYPES GENERIC!!!
// TODO: Remove this hook and use hooks defined above in relevant components

const createGeometry = (res: APIResponseObject): Geometry => ({
  location: {
    lat: res.loc?.[1] ?? res.lat ?? 0,
    lng: res.loc?.[0] ?? res.lng ?? 0,
  },
});

const transformFoodResponse: RT<FoodResponse, FoodData> = (res) => {
  return {
    channel: "yemek",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: res.extraParams?.icon ?? null,
      reason: res.reason ?? null,
    },
    reference: res.entry_id ?? null,
  };
};

const transformAhbapResponse: RT<AhbapResponse, AhbapData> = (res) => {
  return {
    channel: "ahbap",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: res.extraParams?.icon ?? null,
    },
    reference: res.entry_id ?? null,
  };
};

const transformHospitalResponse: RT<HospitalResponse, HospitalData> = (res) => {
  return {
    channel: "hastane",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      icon: "images/icon-10.png",
      city: res.extraParams?.il ?? null,
      description: null,
    },
    reference: res.entry_id ?? null,
  };
};

const transformTeleteyitResponse: RT<TeleteyitResponse, TeleteyitData> = (
  res
) => {
  return {
    channel: "teleteyit",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.["isim-soyisim"] ?? null,
      description: res.extraParams?.aciklama ?? null,
      icon: "images/icon-14.png",
      reason: res.reason ?? null,
      city: res.extraParams?.il ?? null,
      district: res.extraParams?.ilce ?? null,
      status: res.extraParams?.durum ?? null,
    },
    reference: res.entry_id ?? null,
  };
};

const transformSatelliteResponse: RT<SatelliteResponse, SatelliteData> = (
  res
) => {
  return {
    channel: "uydu",
    geometry: createGeometry(res),
    properties: {
      damage: res.extraParams?.damage ?? null,
      verified: res.is_location_verified ?? false,
      icon: "images/icon-13.png",
      name: null,
      description: null,
    },
    reference: res.entry_id ?? null,
  };
};

const transformPharmacyResponse: RT<PharmacyResponse, PharmacyData> = (res) => {
  return {
    channel: "eczane",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      reason: res.reason ?? null,
      icon: "images/icon-15.png",
      verified: res.is_location_verified ?? false,
      description: null,
    },
    reference: res.entry_id ?? null,
  };
};

const transformSafePlaceResponse: RT<SafePlaceResponse, SafePlaceData> = (
  res
) => {
  return {
    channel: "guvenli",
    geometry: createGeometry(res),
    properties: {
      description: res.extraParams?.description ?? null,
      icon: "images/icon-16.png",
      reason: res.reason ?? null,
      name: res.extraParams?.name ?? null,
      verified: res.is_location_verified ?? false,
    },
    reference: res.entry_id ?? null,
  };
};

export const transformTwitterResponse: RT<TwitterResponse, TwitterData> = (
  res
) => {
  return {
    channel: "twitter",
    properties: {
      full_text: res.full_text ?? "",
      reason: res.reason ?? null,
      screen_name: res.extraParams?.screen_name ?? null,
      name: res.extraParams?.name ?? null,
      tweet_id: res.extraParams?.tweet_id ?? null,
      formatted_address: res.formatted_address,
      timestamp: res.timestamp ?? null,
      description: null,
    },
    geometry: createGeometry(res),
    reference: res.entry_id ?? null,
  };
};

export const transformBabalaResponse: RT<BabalaResponse, BabalaData> = (
  res
) => {
  return {
    channel: "babala",
    properties: {
      reason: res.reason ?? null,
      full_text: res.full_text ?? "",
      timestamp: res.timestamp ?? null,
      formatted_address: res.formatted_address,
      name: res.extraParams?.name ?? null,
      description: null,
    },
    geometry: createGeometry(res),
    reference: res.entry_id ?? null,
  };
};

export const transformTeyitEnkazResponse: RT<
  TeyitEnkazResponse,
  TeyitEnkazData
> = (res) => {
  return {
    channel: "teyit_enkaz",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: null, // TODO: fix this after we have an icon
    },
    reference: res.entry_id ?? null,
  };
};

export const transformTeyitYardimResponse: RT<
  TeyitYardimResponse,
  TeyitYardimData
> = (res) => {
  return {
    channel: "teyit_yardim",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: null,
    },
    reference: res.entry_id ?? null,
  };
};

export const transformDepremIOResponse: RT<DepremIOResponse, DepremIOData> = (
  res
) => {
  return {
    channel: "depremio",
    geometry: createGeometry(res),
    properties: {
      name: res.extraParams?.name ?? null,
      description: res.extraParams?.description ?? null,
      type: res.extraParams?.styleUrl ?? null,
      icon: null,
    },
    reference: res.entry_id ?? null,
  };
};

export const transformers: Record<APIChannel, RT> = {
  ahbap_location: transformAhbapResponse as RT,
  eczane_excel: transformPharmacyResponse as RT,
  guvenli_yerler_oteller: transformSafePlaceResponse as RT,
  hastahane_locations: transformHospitalResponse as RT,
  sahra_mutfak: transformFoodResponse as RT,
  sicak_yemek: transformFoodResponse as RT,
  teleteyit: transformTeleteyitResponse as RT,
  turk_eczane: transformPharmacyResponse as RT,
  uydu: transformSatelliteResponse as RT,
  twitter: transformTwitterResponse as RT,
  babala: transformBabalaResponse as RT,
  teyit_enkaz: transformTeyitEnkazResponse as RT,
  depremio: transformDepremIOResponse as RT,
  teyit_yardim: transformTeyitYardimResponse as RT,
  malatya_yemek: transformFoodResponse as RT,
  adana_yemek: transformFoodResponse as RT,
};

export function useVerifiedLocations() {
  const channelFilter = useChannelFilterMenuOption();

  const foodLocations = useLocation(
    ["sicak_yemek", "adana_yemek", "malatya_yemek", "sahra_mutfak"],
    "yemek",
    {
      transformResponse: transformFoodResponse as RT,
    }
  );

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

  const babalaLocations = useLocation(["babala"], "babala", {
    disable: !["babala", null].includes(channelFilter),
    transformResponse: transformBabalaResponse as RT,
  });

  const twitterLocations = useLocation(["twitter"], "twitter", {
    disable: !["twitter", null].includes(channelFilter),
    transformResponse: transformTwitterResponse as RT,
  });

  return {
    babalaLocations,
    twitterLocations,
    foodLocations,
    ahbapLocations,
    hospitalLocations,
    teleteyitLocations,
    satelliteLocations,
    pharmacyLocations,
    safePlaceLocations,
  };
}
