import { useState } from "react";

export function useGetUserLocation() {
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | undefined
  >(undefined);

  const successCallback = (position: any) => {
    setLocation(position.coords);
  };

  const errorCallback = () => {
    alert("Konum belirleme için lokasyon bilgisine izin vermelisiniz.");
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  return { location, getUserLocation };
}
