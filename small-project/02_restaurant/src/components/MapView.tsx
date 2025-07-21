import React, { useEffect, useRef } from "react";
import { Restaurant } from "../types/Restaurant";

interface MapViewProps {
  userlocation: { latitude: number; longitude: number } | null;
  restaurants: Restaurant[];
}

function MapView({ userlocation, restaurants }: MapViewProps) { 
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!window.kakao || !mapRef.current) return;

        const { kakao } = window;
        const center = new kakao.maps.LatLng(
            userlocation?.latitude || 37.5665,
            userlocation?.longitude || 126.978
        );

        const map = new kakao.maps.Map(mapRef.current, {
            center,
            level: 4,
        });

        new kakao.maps.Marker({
            map,
            position: center,
            title: "내 위치",
        });

        restaurants.forEach((r)) => {
            new kakao.maps.Marker({
                map,
                position: new kakao.maps.LatLng(r.latitude, r.longitude),
                title: r.name,
            }); 
        });
    }, [userlocation, restaurants]);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;

    export default MapView;