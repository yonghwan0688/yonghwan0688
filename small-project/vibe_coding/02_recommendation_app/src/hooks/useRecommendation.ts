import { useState, useEffect } from "react";
import {
  Restaurant,
  WeatherInfo,
  UserLocation,
  RecommendationSettings,
  RecommendationResult,
} from "../types";
import { getCurrentWeather, getUserLocation } from "../utils/api";
import {
  recommendRestaurantsBFS,
  recommendRestaurantsDFS,
} from "../utils/recommendation";
import restaurantsData from "../data/restaurants.json";

export const useRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [recommendations, setRecommendations] =
    useState<RecommendationResult | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 사용자 위치 가져오기
      const location = await getUserLocation();
      setUserLocation(location);

      // 날씨 정보 가져오기
      const weatherInfo = await getCurrentWeather(location.lat, location.lng);
      setWeather(weatherInfo);
    } catch (err) {
      setError("초기 데이터를 로드하는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async (
    algorithm: "BFS" | "DFS",
    settings: RecommendationSettings
  ): Promise<void> => {
    if (!weather || !userLocation) {
      setError("날씨 정보 또는 위치 정보가 없습니다.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const startTime = Date.now();
      const restaurants = restaurantsData.restaurants as Restaurant[];

      let recommendedRestaurants: Restaurant[];

      if (algorithm === "BFS") {
        recommendedRestaurants = recommendRestaurantsBFS(
          restaurants,
          weather,
          userLocation,
          settings
        );
      } else {
        recommendedRestaurants = recommendRestaurantsDFS(
          restaurants,
          weather,
          userLocation,
          settings
        );
      }

      const searchTime = Date.now() - startTime;

      const result: RecommendationResult = {
        restaurants: recommendedRestaurants,
        algorithm,
        searchTime,
        totalSearched: restaurants.length,
        criteria: {
          weather,
          location: userLocation,
          settings,
        },
      };

      setRecommendations(result);
    } catch (err) {
      setError("추천을 생성하는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = async () => {
    if (!userLocation) return;

    try {
      setLoading(true);
      const weatherInfo = await getCurrentWeather(
        userLocation.lat,
        userLocation.lng
      );
      setWeather(weatherInfo);
    } catch (err) {
      setError("날씨 정보를 새로고침하는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    weather,
    userLocation,
    recommendations,
    getRecommendations,
    refreshWeather,
    initializeData,
  };
};
