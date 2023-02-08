import styles from "./Map.module.css";
import { Button } from "@mui/material";
import { useMap } from "react-leaflet";

const cities = [
  {
    name: "adana",
    location: {
      lat: 36.9914194,
      lng: 35.3308285,
    },
  },
  {
    name: "adıyaman",
    location: {
      lat: 37.76365,
      lng: 38.2772592,
    },
  },
  {
    name: "elazığ",
    location: {
      lat: 38.3553627,
      lng: 38.33352470000001,
    },
  },
  {
    name: "gaziantep",
    location: {
      lat: 37.065953,
      lng: 37.37811,
    },
  },
  {
    name: "hatay",
    location: {
      lat: 36.4018488,
      lng: 36.3498097,
    },
  },
  {
    name: "kahramanmaraş",
    location: {
      lat: 37.5752755,
      lng: 36.9228223,
    },
  },
  {
    name: "kilis",
    location: {
      lat: 36.716477,
      lng: 37.114661,
    },
  },
  {
    name: "malatya",
    location: {
      lat: 38.3553627,
      lng: 38.33352470000001,
    },
  },
  {
    name: "mersin",
    location: {
      lat: 36.8121041,
      lng: 34.6414811,
    },
  },
  {
    name: "osmaniye",
    location: {
      lat: 37.0746279,
      lng: 36.2464002,
    },
  },
];

export default function ImpactedCities() {
  const map = useMap();

  return (
    <div className={styles.impacted_cities}>
      {cities.map((city) => (
        <div key={city.name} className={styles.impacted_city}>
          <Button fullWidth onClick={() => map.setView(city.location)}>
            {city.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
