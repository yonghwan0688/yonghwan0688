import React, { useEffect, useState } from "react";
import "./App.css";
import { restaurants } from "./data/restaurants";
import RestaurantCard from "./components/RestaurantCard";
import SearchBar from "./components/SearchBar";
import { getDistance } from "./utils/distance";
import { Restaurant } from "./types/restaurant";

function App() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [sortedRestaurants, setSortedRestaurants] = useState<
    { restaurant: Restaurant; distance: number }[]
  >([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        alert("위치 정보를 사용할 수 없습니다.");
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const withDistance = restaurants.map((r) => ({
        restaurant: r,
        distance: getDistance(
          userLocation.lat,
          userLocation.lon,
          r.latitude,
          r.longitude
        ),
      }));
      withDistance.sort((a, b) => a.distance - b.distance);
      setSortedRestaurants(withDistance);
    }
  }, [userLocation]);

  const filteredRestaurants = sortedRestaurants.filter(({ restaurant }) =>
    restaurant.name.includes(search)
  );

  return (
    <div className="App">
      <h1>내 주변 레스토랑 추천</h1>
      <SearchBar value={search} onChange={setSearch} />
      {!userLocation && <p>위치 정보를 불러오는 중...</p>}
      {userLocation &&
        filteredRestaurants.map(({ restaurant, distance }) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            distance={distance}
          />
        ))}
    </div>
  );
}

export default App;
