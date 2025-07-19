import { useState, useEffect } from "react";
import {
  Restaurant,
  WeatherInfo,
  UserLocation,
  RecommendationSettings,
  EnhancedRecommendationSettings,
  RecommendationResult,
  SearchFilter,
  UserFeedback,
} from "../types";
import { getCurrentWeather, getUserLocation } from "../utils/api";
import {
  recommendRestaurantsBFS,
  recommendRestaurantsDFS,
} from "../utils/recommendation";
import {
  recommendRestaurantsAStar,
  recommendRestaurantsHybrid,
  contextualRecommendation,
  diversifiedRecommendation,
  RecommendationLearner,
} from "../utils/enhancedRecommendation";
import { advancedFilter } from "../utils/advancedSearch";
import restaurantsData from "../data/restaurants.json";

// 거리 계산 함수
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export const useRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [recommendations, setRecommendations] =
    useState<RecommendationResult | null>(null);
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({});
  const [learner] = useState(new RecommendationLearner());

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
    algorithm: "BFS" | "DFS" | "A_STAR" | "HYBRID",
    settings: RecommendationSettings | EnhancedRecommendationSettings
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

      // 거리 계산 추가
      const restaurantsWithDistance = restaurants.map((restaurant) => ({
        ...restaurant,
        location: {
          ...restaurant.location,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            restaurant.location.lat,
            restaurant.location.lng
          ),
        },
      }));

      let recommendedRestaurants: Restaurant[];

      switch (algorithm) {
        case "BFS":
          recommendedRestaurants = recommendRestaurantsBFS(
            restaurantsWithDistance,
            weather,
            userLocation,
            settings as RecommendationSettings
          );
          break;
        case "DFS":
          recommendedRestaurants = recommendRestaurantsDFS(
            restaurantsWithDistance,
            weather,
            userLocation,
            settings as RecommendationSettings
          );
          break;
        case "A_STAR":
          recommendedRestaurants = recommendRestaurantsAStar(
            restaurantsWithDistance,
            weather,
            userLocation,
            settings as EnhancedRecommendationSettings
          );
          break;
        case "HYBRID":
          recommendedRestaurants = recommendRestaurantsHybrid(
            restaurantsWithDistance,
            weather,
            userLocation,
            settings as EnhancedRecommendationSettings
          );
          break;
        default:
          recommendedRestaurants = recommendRestaurantsBFS(
            restaurantsWithDistance,
            weather,
            userLocation,
            settings as RecommendationSettings
          );
      }

      const searchTime = Date.now() - startTime;

      // 메타데이터 계산
      const categoryDistribution: { [category: string]: number } = {};
      recommendedRestaurants.forEach((restaurant) => {
        categoryDistribution[restaurant.category] =
          (categoryDistribution[restaurant.category] || 0) + 1;
      });

      const averageDistance =
        recommendedRestaurants.reduce(
          (sum, restaurant) => sum + (restaurant.location.distance || 0),
          0
        ) / recommendedRestaurants.length;

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
        metadata: {
          averageDistance,
          categoryDistribution,
          diversityScore:
            Object.keys(categoryDistribution).length /
            recommendedRestaurants.length,
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

  // 향상된 검색 기능
  const searchRestaurants = async (
    filter: SearchFilter
  ): Promise<Restaurant[]> => {
    const restaurants = restaurantsData.restaurants as Restaurant[];

    const restaurantsWithDistance = restaurants.map((restaurant) => ({
      ...restaurant,
      location: {
        ...restaurant.location,
        distance: userLocation
          ? calculateDistance(
              userLocation.lat,
              userLocation.lng,
              restaurant.location.lat,
              restaurant.location.lng
            )
          : 0,
      },
    }));

    const filtered = advancedFilter(
      restaurantsWithDistance,
      filter,
      weather || undefined
    );

    return filtered;
  };

  // 컨텍스트 기반 추천
  const getContextualRecommendations = async (
    settings: EnhancedRecommendationSettings
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

      const restaurantsWithDistance = restaurants.map((restaurant) => ({
        ...restaurant,
        location: {
          ...restaurant.location,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            restaurant.location.lat,
            restaurant.location.lng
          ),
        },
      }));

      const recommendedRestaurants = contextualRecommendation(
        restaurantsWithDistance,
        weather,
        userLocation,
        settings
      );

      const searchTime = Date.now() - startTime;

      const result: RecommendationResult = {
        restaurants: recommendedRestaurants,
        algorithm: "HYBRID",
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
      setError("컨텍스트 기반 추천을 생성하는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 다양성 고려 추천
  const getDiversifiedRecommendations = async (
    settings: EnhancedRecommendationSettings
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

      const restaurantsWithDistance = restaurants.map((restaurant) => ({
        ...restaurant,
        location: {
          ...restaurant.location,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            restaurant.location.lat,
            restaurant.location.lng
          ),
        },
      }));

      const recommendedRestaurants = diversifiedRecommendation(
        restaurantsWithDistance,
        weather,
        userLocation,
        settings
      );

      const searchTime = Date.now() - startTime;

      const result: RecommendationResult = {
        restaurants: recommendedRestaurants,
        algorithm: "HYBRID",
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
      setError("다양성 기반 추천을 생성하는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 사용자 피드백 처리
  const addFeedback = (feedback: UserFeedback) => {
    learner.addFeedback(feedback);
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
    searchFilter,
    getRecommendations,
    searchRestaurants,
    getContextualRecommendations,
    getDiversifiedRecommendations,
    addFeedback,
    setSearchFilter,
    refreshWeather,
    initializeData,
  };
};
