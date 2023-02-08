import { useRef } from "react";
import { useMap } from "react-leaflet";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useDebouncedCallback } from "use-debounce";
import { Autocomplete, TextField } from "@mui/material";

export default function SearchInput(props: { close: () => void }) {
  const map = useMap();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    options: {
      componentRestrictions: {
        country: ["tr"],
      },
    },
  });

  const debouncedPlaces = useDebouncedCallback((value: string) => {
    getPlacePredictions({ input: value });
  }, 1000);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Autocomplete
        sx={{
          zIndex: 10000,
        }}
        id="google-places-search"
        options={placePredictions}
        autoComplete
        renderInput={(params) => (
          <TextField
            {...params}
            label="Yer Ara"
            variant="outlined"
            fullWidth
            ref={inputRef}
            autoFocus
          />
        )}
        onInputChange={(event, newInputValue) => {
          debouncedPlaces(newInputValue);
        }}
        onChange={(event, newValue) => {
          if (!newValue || !newValue.place_id) {
            return;
          }
          placesService.getDetails(
            { placeId: newValue.place_id },
            (placeDetails: any) => {
              if (
                !placeDetails ||
                !placeDetails.geometry ||
                !placeDetails.geometry.location
              ) {
                return;
              }
              map.flyTo([
                placeDetails.geometry.location.lat(),
                placeDetails.geometry.location.lng(),
              ]);
              props.close();
            }
          );
        }}
        getOptionLabel={(option) => option.description}
        renderOption={(props, option) => {
          return (
            <li
              {...props}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                }}
              >
                {option.structured_formatting.main_text || "Hata"}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                }}
              >
                {option.structured_formatting.secondary_text || "Hata"}
              </div>
            </li>
          );
        }}
        loading={isPlacePredictionsLoading}
      />
    </div>
  );
}
