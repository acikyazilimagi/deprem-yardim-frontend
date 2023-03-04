import { APIChannel, APIResponseObject, ChannelData, RT } from "@/types";
import { ClientChannel } from "../types/index";
import {
  transformFoodResponse,
  transformBabalaResponse,
  transformAhbapResponse,
  transformHospitalResponse,
  transformTeleteyitResponse,
  transformSatelliteResponse,
  transformPharmacyResponse,
  transformSafePlaceResponse,
  transformTwitterResponse,
  transformTeyitEnkazResponse,
  transformTeyitYardimResponse,
  transformDepremIOResponse,
} from "@/services/responses";

const mapAPIChannelDataChannel: Record<APIChannel, ClientChannel> = {
  ahbap_location: "ahbap",
  sicak_yemek: "yemek",
  hastahane_locations: "hastane",
  teleteyit: "teleteyit",
  uydu: "uydu",
  sahra_mutfak: "yemek",
  turk_eczane: "eczane",
  eczane_excel: "eczane",
  guvenli_yerler_oteller: "guvenli",
  twitter: "twitter",
  teyit_enkaz: "teyit_enkaz",
  babala: "babala",
  adana_yemek: "yemek",
  malatya_yemek: "yemek",
  depremio: "depremio",
  teyit_yardim: "teyit_yardim",
};

export type TransformerType<
  TChannel extends APIChannel = APIChannel,
  TResponse extends APIResponseObject = APIResponseObject,
  TData extends ChannelData = ChannelData
> = TResponse extends { channel: infer TResChannel }
  ? TData extends { channel: infer TDataChannel }
    ? TResChannel extends TChannel
      ? TDataChannel extends (typeof mapAPIChannelDataChannel)[TChannel]
        ? RT<TResponse, TData>
        : never
      : never
    : never
  : never;

export type TransformersType = {
  [TChannel in APIChannel]: TransformerType<TChannel>;
};

export const transformers = {
  ahbap_location: transformAhbapResponse,
  eczane_excel: transformPharmacyResponse,
  guvenli_yerler_oteller: transformSafePlaceResponse,
  hastahane_locations: transformHospitalResponse,
  sahra_mutfak: transformFoodResponse,
  sicak_yemek: transformFoodResponse,
  teleteyit: transformTeleteyitResponse,
  turk_eczane: transformPharmacyResponse,
  uydu: transformSatelliteResponse,
  twitter: transformTwitterResponse,
  babala: transformBabalaResponse,
  teyit_enkaz: transformTeyitEnkazResponse,
  depremio: transformDepremIOResponse,
  teyit_yardim: transformTeyitYardimResponse,
  malatya_yemek: transformFoodResponse,
  adana_yemek: transformFoodResponse,
} as const satisfies TransformersType;
