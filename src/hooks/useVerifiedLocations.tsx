import useLocation from "./useLocation";

// TODO: PUT THESE HOOKS INTO THEIR OWN FILES
// TODO: Remove this hook and use hooks defined above in relevant components
export function useVerifiedLocations() {
  const foodLocations = useLocation(["sicak_yemek"], "yemek", {
    transformResponse: (res) => {
      return {
        channel: "yemek",
        geometry: {
          location: {
            lat: res.loc[1],
            lng: res.loc[0],
          },
        },
        properties: res.extraParams,
      };
    },
  });

  const ahbapLocations = useLocation(["ahbap_location"], "ahbap", {
    transformResponse: (res) => {
      return {
        channel: "ahbap",
        geometry: {
          location: {
            lat: res.loc[1],
            lng: res.loc[0],
          },
        },
        properties: res.extraParams,
      };
    },
  });

  const hospitalLocations = useLocation(["hastahane_locations"], "hastane", {
    transformResponse: (res) => {
      return {
        channel: "hastane",
        geometry: {
          location: {
            lat: res.loc[1],
            lng: res.loc[0],
          },
        },
        properties: { ...res.extraParams, icon: "images/icon-10.png" },
      };
    },
  });

  const teleteyitLocations = useLocation(["teleteyit"], "teleteyit", {
    transformResponse: (res) => {
      return {
        channel: "teleteyit",
        geometry: {
          location: {
            lat: res.loc[1],
            lng: res.loc[0],
          },
        },
        properties: {
          name: res.extraParams.name,
          description: res.extraParams.aciklama,
          type: res.extraParams.styleUrl,
          icon: "images/icon-14.png",
          id: res.id,
          reason: res.reason,
          city: res.extraParams.il,
          district: res.extraParams.ilce,
          status: res.extraParams.durum,
        },
      };
    },
  });

  const satelliteLocations = useLocation(["uydu"], "uydu", {
    transformResponse: (res) => {
      return {
        channel: "uydu",
        geometry: {
          location: {
            lat: res.loc[1],
            lng: res.loc[0],
          },
        },
        properties: { ...res.extraParams, icon: "images/icon-13.png" },
      };
    },
  });

  const sahraKitchenLocations = useLocation(["sahra_mutfak"], "sahra", {
    transformResponse: (res) => {
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
    },
  });

  const pharmacyLocations = useLocation(
    ["eczane_excel", "turk_eczane"],
    "eczane",
    {
      transformResponse: (res) => {
        return {
          channel: "sahra",
          geometry: {
            location: {
              lat: res.loc[1],
              lng: res.loc[0],
            },
          },
          properties: {
            ...res.extraParams,
            icon: "images/icon-15.png",
            id: res.id,
            reason: res.reason,
            verified: res.is_location_verified,
          },
        };
      },
    }
  );
  const safePlaceLocations = useLocation(
    ["guvenli_yerler_oteller"],
    "guvenli",
    {
      transformResponse: (res) => {
        return {
          channel: "guvenli",
          geometry: {
            location: {
              lat: res.loc[1],
              lng: res.loc[0],
            },
          },
          properties: {
            ...res.extraParams,
            icon: "images/icon-16.png",
          },
        };
      },
    }
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
