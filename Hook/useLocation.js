import { useState } from "react";
import { StoreContext } from "@/context/storeContext";
import { useContext } from "react";

const useLocation = () => {
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);
  const { latLong, setLatLong } = useContext(StoreContext);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
    setLocationError("");
    setLoading(false);
  }

  function error() {
    setLoading(false);
    setLocationError("Unable to retrieve your location");
  }

  const handleLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    locationError,
    latLong,
    handleLocation,
    loading,
  };
};

export default useLocation;
