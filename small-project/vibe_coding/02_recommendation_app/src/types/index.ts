// 음식점 정보 타입
export interface Restaurant {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  rating: number;
  priceRange: number; // 1-4 ($ ~ $$$$)
  location: {
    lat: number;
    lng: number;
    address: string;
    distance?: number; // 사용자로부터의 거리 (km)
  };
  openHours: {
    [key: string]: { open: string; close: string } | null;
  };
  tags: string[]; // ['뜨거운', '시원한', '든든한', '가벼운', '매운', '달콤한' 등]
  weatherSuitable: string[]; // ['sunny', 'rainy', 'cloudy', 'cold', 'hot']
}

// 사용자 위치 타입
export interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}

// 날씨 정보 타입
export interface WeatherInfo {
  temperature: number;
  condition: string; // 'sunny', 'rainy', 'cloudy', 'snow' 등
  description: string;
  humidity: number;
  windSpeed: number;
}

// 추천 설정 타입
export interface RecommendationSettings {
  maxDistance: number; // km
  priceRange: number[];
  mealType: "lunch" | "dinner" | "any";
  cuisinePreferences: string[];
  dietaryRestrictions: string[];
}

// BFS/DFS 그래프 노드 타입
export interface GraphNode {
  restaurant: Restaurant;
  connections: string[]; // 연결된 레스토랑 ID들
  visited?: boolean;
  distance?: number;
  score?: number; // 추천 점수
}

// 추천 결과 타입
export interface RecommendationResult {
  restaurants: Restaurant[];
  algorithm: "BFS" | "DFS";
  searchTime: number;
  totalSearched: number;
  criteria: {
    weather: WeatherInfo;
    location: UserLocation;
    settings: RecommendationSettings;
  };
}
