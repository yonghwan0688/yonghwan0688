import React, { useEffect, useState } from "react";
import "./App.css";
import { restaurants } from "./data/restaurants";
import RestaurantCard from "./components/RestaurantCard";
import SearchBar from "./components/SearchBar";
import { getDistance } from "./utils/distance";
import { Restaurant } from "./types/restaurant";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantDetail from "./pages/RestaurantDetail";
import MapView from "./components/MapView";

function App() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((favs) =>
      favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]
    );
  };

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [sortedRestaurants, setSortedRestaurants] = useState<
    { restaurant: Restaurant; distance: number }[]
  >([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("전체");
  const [minRating, setMinRating] = useState<number>(0);
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

  const filteredRestaurants = sortedRestaurants.filter(({ restaurant }) => {
    const matchSearch = restaurant.name.includes(search);
    const matchCategory =
      category === "전체" ||
      (restaurant.category && restaurant.category.includes(category));
    const matchRating = !restaurant.rating || restaurant.rating >= minRating;
    return matchSearch && matchCategory && matchRating;
  });

  return (
    <Router>
      <div className="App">
        <h1>내 주변 레스토랑 추천</h1>
        <SearchBar value={search} onChange={setSearch} />
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="한식">한식</option>
            <option value="이탈리안">이탈리안</option>
            <option value="중식">중식</option>
            <option value="양식">양식</option>
            <option value="일식">일식</option>
            <option value="패스트푸드">패스트푸드</option>
          </select>
          <label>
            최소평점:
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              placeholder="최소 평점"
            />
          </label>
        </div>
        {!userLocation && <p>위치 정보를 불러오는 중...</p>}
        {userLocation && (
          <MapView
            userLocation={userLocation}
            restaurants={filteredRestaurants.map((r) => r.restaurant)}
          />
        )}
        {userLocation &&
          filteredRestaurants.map(({ restaurant, distance }) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              distance={distance}
              isFavorite={favorites.includes(restaurant.id)}
              onFavorite={toggleFavorite}
            />
          ))}
      </div>
    </Router>
  );
}

export default App;
