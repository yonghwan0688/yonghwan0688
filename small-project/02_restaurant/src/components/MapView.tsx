import React, { useEffect, useRef } from "react";
import { Restaurant } from "../types/restaurant";

interface MapViewProps {
  userLocation: { lat: number; lon: number } | null;
  restaurants: Restaurant[];
}

function MapView({ userLocation, restaurants }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao || !mapRef.current || !userLocation) return;

    const { kakao } = window;
    const center = new kakao.maps.LatLng(userLocation.lat, userLocation.lon);

    const map = new kakao.maps.Map(mapRef.current, {
      center,
      level: 4,
    });

    // 사용자 위치 마커
    new kakao.maps.Marker({
      map,
      position: center,
      title: "내 위치",
    });

    // 레스토랑 마커
    restaurants.forEach((r) => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(r.latitude, r.longitude),
        title: r.name,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;"><strong>${r.name}</strong>
        ${r.address ? r.address : ""}
        ${r.phone ? `<br/>전화: ${r.phone}` : ""}
        </div>`,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    });
  }, [userLocation, restaurants]);

  return (
    <div className="MapView">
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
}

export default MapView;
