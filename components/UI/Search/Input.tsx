import React from "react";
import { TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";
import { useMap } from "react-leaflet";

// const placeTypes = [
//   "accounting",
//   "airport",
//   "amusement_park",
//   "aquarium",
//   "art_gallery",
//   "atm",
//   "bakery",
//   "bank",
//   "bar",
//   "beauty_salon",
//   "bicycle_store",
//   "book_store",
//   "bowling_alley",
//   "bus_station",
//   "cafe",
//   "campground",
//   "car_dealer",
//   "car_rental",
//   "car_repair",
//   "car_wash",
//   "casino",
//   "cemetery",
//   "church",
//   "city_hall",
//   "clothing_store",
//   "convenience_store",
//   "courthouse",
//   "dentist",
//   "department_store",
//   "doctor",
//   "drugstore",
//   "electrician",
//   "electronics_store",
//   "embassy",
//   "fire_station",
//   "florist",
//   "funeral_home",
//   "furniture_store",
//   "gas_station",
//   "gym",
//   "hair_care",
//   "hardware_store",
//   "hindu_temple",
//   "home_goods_store",
//   "hospital",
//   "insurance_agency",
//   "jewelry_store",
//   "laundry",
//   "lawyer",
//   "library",
//   "light_rail_station",
//   "liquor_store",
//   "local_government_office",
//   "locksmith",
//   "lodging",
//   "meal_delivery",
//   "meal_takeaway",
//   "mosque",
//   "movie_rental",
//   "movie_theater",
//   "moving_company",
//   "museum",
//   "night_club",
//   "painter",
//   "park",
//   "parking",
//   "pet_store",
//   "pharmacy",
//   "physiotherapist",
//   "plumber",
//   "police",
//   "post_office",
//   "primary_school",
//   "real_estate_agency",
//   "restaurant",
//   "roofing_contractor",
//   "rv_park",
//   "school",
//   "secondary_school",
//   "shoe_store",
//   "shopping_mall",
//   "spa",
//   "stadium",
//   "storage",
//   "store",
//   "subway_station",
//   "supermarket",
//   "synagogue",
//   "taxi_stand",
//   "tourist_attraction",
//   "train_station",
//   "transit_station",
//   "travel_agency",
//   "university",
//   "veterinary_care",
//   "zoo",
// ];

export default function SearchInput() {
  const map = useMap();

  const { ref: inputRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      if (!place.geometry) return;
      if (!place.geometry.location) return;
      map.flyTo([place.geometry.location.lat(), place.geometry.location.lng()]);
      console.log(place);
    },
    options: {
      types: [],
      componentRestrictions: { country: "tr" },
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      <TextField
        label="Yer Ara"
        fullWidth
        color="primary"
        variant="outlined"
        inputRef={inputRef}
      />
    </div>
  );
}
