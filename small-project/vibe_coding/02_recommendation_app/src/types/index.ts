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

// 확장된 추천 설정 타입
export interface EnhancedRecommendationSettings extends RecommendationSettings {
  algorithm: "BFS" | "DFS" | "A_STAR" | "HYBRID";
  searchMode: "speed" | "accuracy" | "balanced";
  userPreferences: {
    favoriteCategories: string[];
    dislikedIngredients: string[];
    moodTags: string[]; // '기분좋은', '힐링', '모험적인' 등
  };
  contextualFactors: {
    occasion?: "casual" | "date" | "business" | "family";
    groupSize?: number;
    timeConstraint?: "quick" | "leisurely";
  };
}

// 검색 필터 타입
export interface SearchFilter {
  keyword?: string;
  fuzzySearch?: boolean;
  category?: string;
  cuisine?: string;
  minRating?: number;
  maxDistance?: number;
  priceRanges?: number[];
  tags?: string[];
  openNow?: boolean;
  weatherOptimized?: boolean;
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
  algorithm: "BFS" | "DFS" | "A_STAR" | "HYBRID";
  searchTime: number;
  totalSearched: number;
  criteria: {
    weather: WeatherInfo;
    location: UserLocation;
    settings: RecommendationSettings | EnhancedRecommendationSettings;
  };
  metadata?: {
    diversityScore?: number;
    averageDistance?: number;
    categoryDistribution?: { [category: string]: number };
  };
}

// 사용자 피드백 타입
export interface UserFeedback {
  restaurantId: string;
  rating: number; // 1-5
  visited: boolean;
  liked: boolean;
  tags: string[];
  timestamp: Date;
}
