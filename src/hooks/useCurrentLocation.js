import React, { useEffect, useState } from "react";

const useCurrentLocation = () => {
  const [currrentLocation, setCurLocation] = useState({
    loaded: false,
    coordinate: { lat: "", lng: "" },
  });

  // hàm đấy sẽ trả về 2 tham số đây là khi thành công call ra được
  const onSucces = (location) => {
    setCurLocation({
      loaded: true,
      coordinate: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  // còn đây là khi ko call ra được và trả về lỗi
  const onError = (error) => {
    setCurLocation({
      loaded: true,
      error:{
        code: error.code,
        message: error.message
      }
    });
  };

  // sau moi lan rerender se kiem tra xem browser do co ton tai current location hay khong
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "not support",
      });
    }
    navigator.geolocation.getCurrentPosition(onSucces, onError);
  }, []);

  return currrentLocation;
};

export default useCurrentLocation;

