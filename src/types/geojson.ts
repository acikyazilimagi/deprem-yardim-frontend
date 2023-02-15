export type AhbapData = {
  channel: "ahbap";
  properties: {
    name: string;
    description: string | { value: string };
    type: string;
    icon: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  closeByRecords?: number[];
};

export type HospitalData = {
  channel: "hospital";
  properties: {
    name: string;
    description: string;
    type: string;
    icon: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export type TeleteyitData = {
  channel: "teleteyit";
  properties: {
    name: string;
    description: string;
    type: string;
    icon: string;
    verified: string;
    city: string;
    district: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  closeByRecords?: number[];
};

export type SatelliteData = {
  channel: "uydu";
  properties: {
    damage: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  closeByRecords?: number[];
};
export type SahraKitchenData = {
  channel: "sahra_mutfak";
  properties: {};
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  id: number;
  reason: string;
  verified: string;
  closeByRecords?: number[];
};

export type PharmacyData = {
  channel: "eczane_excel";
  properties: {};
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  id: number;
  reason: string;
  verified: string;
  closeByRecords?: number[];
};

export type SafePlaceData = {
  channel: "guvenli_yerler_oteller";
  properties: {
    reason: string;
    verified: string;
  };
  reference?: undefined;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  closeByRecords?: number[];
};
