import { useMapActions } from "@/stores/mapStore";
import { Autocomplete, TextField } from "@mui/material";
import L from "leaflet";

type EarthquakeAreaOption = {
  label: string;
  city: string;
  latlng: {
    lat: L.LatLng["lat"];
    lng: L.LatLng["lng"];
  };
};

const earthquakeAreas: EarthquakeAreaOption[] = [
  {
    label: "Çelikhan (Adıyaman)",
    city: "Adıyaman",
    latlng: { lat: 38.069, lng: 38.326 },
  },
  {
    label: "Gölbaşı (Adıyaman)",
    city: "Adıyaman",
    latlng: { lat: 37.807, lng: 37.66 },
  },
  {
    label: "Sincik (Adıyaman)",
    city: "Adıyaman",
    latlng: { lat: 38.125, lng: 38.561 },
  },
  {
    label: "Nurdağı (Gaziantep)",
    city: "Gaziantep",
    latlng: { lat: 37.304, lng: 36.92 },
  },
  {
    label: "İslahiye (Gaziantep)",
    city: "Gaziantep",
    latlng: { lat: 37.114, lng: 36.634 },
  },
  {
    label: "Ekinözü (Kahramanmaraş)",
    city: "Kahramanmaraş",
    latlng: { lat: 38.042, lng: 37.227 },
  },
  {
    label: "Elbistan (Kahramanmaraş)",
    city: "Kahramanmaraş",
    latlng: { lat: 38.089, lng: 37.239 },
  },
  {
    label: "Göksun (Kahramanmaraş)",
    city: "Kahramanmaraş",
    latlng: { lat: 38.071, lng: 36.478 },
  },

  {
    label: "Onikişubat (Kahramanmaraş)",
    city: "Kahramanmaraş",
    latlng: { lat: 37.973, lng: 36.567 },
  },
  {
    label: "Pazarcık (Kahramanmaraş)",
    city: "Kahramanmaraş",
    latlng: { lat: 37.288, lng: 37.043 },
  },
  {
    label: "Doğanşehir (Malatya)",
    city: "Malatya",
    latlng: { lat: 38.181, lng: 37.954 },
  },
  {
    label: "Pütürge (Malatya)",
    city: "Malatya",
    latlng: { lat: 38.135, lng: 38.617 },
  },
  {
    label: "Yeşilyurt (Malatya)",
    city: "Malatya",
    latlng: { lat: 38.311, lng: 38.191 },
  },
];

const LocationAutocomplete = () => {
  const { setCoordinates, setShouldPositionUpdate } = useMapActions();

  return (
    <Autocomplete
      disablePortal
      id="location-autocomplete"
      options={earthquakeAreas}
      groupBy={(option) => option.city}
      sx={{ width: 280 }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Bölge" size="small" />
      )}
      noOptionsText="Bölge bulunamadı"
      onChange={(event, newValue) => {
        if (!newValue) return;

        const bounds = L.latLngBounds(
          L.latLng(newValue.latlng.lat - 0.5, newValue.latlng.lng - 0.5),
          L.latLng(newValue.latlng.lat + 0.5, newValue.latlng.lng + 0.5)
        );

        setCoordinates(bounds);
        setShouldPositionUpdate(true);
        // map.setView(newValue.latlng, 12);
      }}
    />
  );
};

export default LocationAutocomplete;
