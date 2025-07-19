import {
  Restaurant,
  WeatherInfo,
  UserLocation,
  RecommendationSettings,
} from "../types";
import {
  advancedFilter,
  multiCriteriaSort,
  SortCriteria,
  AdvancedFilter,
} from "./advancedSearch";

// 확장된 추천 설정
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

// A* 알고리즘을 위한 휴리스틱 함수
function heuristic(
  restaurant: Restaurant,
  target: UserLocation,
  weather: WeatherInfo,
  settings: EnhancedRecommendationSettings
): number {
  let score = 0;

  // 거리 점수 (가까울수록 높은 점수)
  const distance = restaurant.location.distance || 0;
  score += Math.max(0, 5 - distance);

  // 평점 점수
  score += restaurant.rating;

  // 날씨 적합도
  if (restaurant.weatherSuitable.includes(weather.condition)) {
    score += 3;
  }

  // 가격대 선호도
  if (settings.priceRange.includes(restaurant.priceRange)) {
    score += 2;
  }

  // 사용자 선호 카테고리
  if (
    settings.userPreferences.favoriteCategories.includes(restaurant.category)
  ) {
    score += 2;
  }

  // 분위기/기분 태그 매칭
  const moodMatch = settings.userPreferences.moodTags.some((mood) =>
    restaurant.tags.includes(mood)
  );
  if (moodMatch) {
    score += 1.5;
  }

  return score;
}

// A* 알고리즘 구현 - 진짜 그래프 탐색
export function recommendRestaurantsAStar(
  restaurants: Restaurant[],
  weather: WeatherInfo,
  userLocation: UserLocation,
  settings: EnhancedRecommendationSettings,
  maxResults: number = 10
): Restaurant[] {
  // 거리 계산 및 초기 데이터 준비
  const restaurantsWithMetrics = restaurants.map((restaurant) => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      restaurant.location.lat,
      restaurant.location.lng
    );

    return {
      ...restaurant,
      location: { ...restaurant.location, distance },
      gScore: Infinity, // 실제 비용 (시작점으로부터)
      fScore: Infinity, // f(n) = g(n) + h(n)
      hScore: heuristic(restaurant, userLocation, weather, settings),
      visited: false,
    };
  });

  // 필터링
  const filtered = restaurantsWithMetrics.filter((restaurant) => {
    if (restaurant.location.distance! > settings.maxDistance) return false;
    if (!settings.priceRange.includes(restaurant.priceRange)) return false;

    if (
      settings.userPreferences.dislikedIngredients.some((ingredient) =>
        restaurant.tags.some((tag) => tag.includes(ingredient))
      )
    )
      return false;

    return true;
  });

  if (filtered.length === 0) return [];

  // A* 알고리즘 실제 구현
  const openSet: typeof filtered = [];
  const closedSet: typeof filtered = [];
  const result: Restaurant[] = [];

  // 시작점 설정 (가장 좋은 휴리스틱 점수)
  const startNode = filtered.reduce((best, current) =>
    current.hScore > best.hScore ? current : best
  );

  startNode.gScore = 0;
  startNode.fScore = startNode.hScore;
  openSet.push(startNode);

  while (openSet.length > 0 && result.length < maxResults) {
    // f값이 가장 낮은(좋은) 노드 선택
    openSet.sort((a, b) => b.fScore - a.fScore);
    const current = openSet.shift()!;

    current.visited = true;
    closedSet.push(current);
    result.push(current);

    // 이웃 노드들 찾기 (유사한 특성을 가진 레스토랑들)
    const neighbors = filtered
      .filter(
        (restaurant) =>
          !restaurant.visited &&
          !openSet.includes(restaurant) &&
          (restaurant.category === current.category || // 같은 카테고리
            restaurant.cuisine === current.cuisine || // 같은 요리 종류
            Math.abs(
              restaurant.location.distance! - current.location.distance!
            ) < 1.0 || // 비슷한 거리
            Math.abs(restaurant.rating - current.rating) < 0.5) // 비슷한 평점
      )
      .slice(0, 3); // 최대 3개의 이웃만 탐색

    for (const neighbor of neighbors) {
      const tentativeGScore =
        current.gScore + calculateMoveCost(current, neighbor);

      if (tentativeGScore < neighbor.gScore) {
        neighbor.gScore = tentativeGScore;
        neighbor.fScore = neighbor.gScore + neighbor.hScore;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // 결과가 부족하면 나머지 고점수 레스토랑으로 채우기
  if (result.length < maxResults) {
    const remaining = filtered
      .filter((r) => !result.includes(r))
      .sort((a, b) => b.hScore - a.hScore)
      .slice(0, maxResults - result.length);

    result.push(...remaining);
  }

  return result.slice(0, maxResults);
}

// 두 레스토랑 간의 이동 비용 계산
function calculateMoveCost(from: Restaurant, to: Restaurant): number {
  const distanceDiff =
    Math.abs(from.location.distance! - to.location.distance!) * 1.5;
  const ratingDiff = Math.abs(from.rating - to.rating) * 0.8;
  const priceDiff = Math.abs(from.priceRange - to.priceRange) * 0.5;

  // 카테고리가 다르면 추가 비용
  const categoryPenalty = from.category !== to.category ? 1.0 : 0;

  return distanceDiff + ratingDiff + priceDiff + categoryPenalty;
}

// 하이브리드 알고리즘 - 실제로 다른 방식들을 조합
export function recommendRestaurantsHybrid(
  restaurants: Restaurant[],
  weather: WeatherInfo,
  userLocation: UserLocation,
  settings: EnhancedRecommendationSettings
): Restaurant[] {
  // 세 가지 다른 접근 방식 적용

  // 1. A* 기반 - 최적화된 탐색
  const aStarResults = recommendRestaurantsAStar(
    restaurants,
    weather,
    userLocation,
    settings,
    8
  );

  // 2. 거리 우선 - 가까운 곳부터
  const distanceResults = restaurants
    .map((restaurant) => ({
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
    }))
    .filter(
      (r) =>
        r.location.distance! <= settings.maxDistance &&
        settings.priceRange.includes(r.priceRange)
    )
    .sort((a, b) => a.location.distance! - b.location.distance!)
    .slice(0, 6);

  // 3. 평점 우선 - 높은 평점부터
  const ratingResults = restaurants
    .filter((r) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        r.location.lat,
        r.location.lng
      );
      return (
        distance <= settings.maxDistance &&
        settings.priceRange.includes(r.priceRange)
      );
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // 4. 날씨 최적화 - 날씨에 맞는 곳
  const weatherResults = restaurants
    .filter((r) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        r.location.lat,
        r.location.lng
      );
      return (
        distance <= settings.maxDistance &&
        settings.priceRange.includes(r.priceRange) &&
        r.weatherSuitable.includes(weather.condition)
      );
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // 가중치 기반 점수 계산
  const scoreMap = new Map<string, number>();

  // A* 결과 (가중치 40%)
  aStarResults.forEach((restaurant, index) => {
    const score = (aStarResults.length - index) * 0.4;
    scoreMap.set(restaurant.id, (scoreMap.get(restaurant.id) || 0) + score);
  });

  // 거리 결과 (가중치 25%)
  distanceResults.forEach((restaurant, index) => {
    const score = (distanceResults.length - index) * 0.25;
    scoreMap.set(restaurant.id, (scoreMap.get(restaurant.id) || 0) + score);
  });

  // 평점 결과 (가중치 25%)
  ratingResults.forEach((restaurant, index) => {
    const score = (ratingResults.length - index) * 0.25;
    scoreMap.set(restaurant.id, (scoreMap.get(restaurant.id) || 0) + score);
  });

  // 날씨 결과 (가중치 10%)
  weatherResults.forEach((restaurant, index) => {
    const score = (weatherResults.length - index) * 0.1;
    scoreMap.set(restaurant.id, (scoreMap.get(restaurant.id) || 0) + score);
  });

  // 모든 후보 레스토랑 수집
  const allCandidates = new Map<string, Restaurant>();
  [
    ...aStarResults,
    ...distanceResults,
    ...ratingResults,
    ...weatherResults,
  ].forEach((restaurant) => {
    allCandidates.set(restaurant.id, restaurant);
  });

  // 점수순으로 정렬하여 최종 결과 생성
  return Array.from(allCandidates.values())
    .sort((a, b) => (scoreMap.get(b.id) || 0) - (scoreMap.get(a.id) || 0))
    .slice(0, 10);
}

// 컨텍스트 기반 추천
export function contextualRecommendation(
  restaurants: Restaurant[],
  weather: WeatherInfo,
  userLocation: UserLocation,
  settings: EnhancedRecommendationSettings
): Restaurant[] {
  let contextualFilter: AdvancedFilter = {};

  // 상황별 필터링
  switch (settings.contextualFactors.occasion) {
    case "date":
      contextualFilter = {
        minRating: 4.0,
        tags: ["로맨틱", "분위기좋은", "조용한"],
        priceRanges: [2, 3, 4], // 중간~고급 가격대
      };
      break;
    case "business":
      contextualFilter = {
        tags: ["조용한", "격식있는", "넓은"],
        priceRanges: [2, 3],
      };
      break;
    case "family":
      contextualFilter = {
        tags: ["아이친화적", "넓은", "시끄러워도괜찮은"],
        priceRanges: [1, 2],
      };
      break;
    case "casual":
      contextualFilter = {
        tags: ["편안한", "캐주얼"],
        priceRanges: [1, 2],
      };
      break;
  }

  // 시간 제약 고려
  if (settings.contextualFactors.timeConstraint === "quick") {
    contextualFilter.tags = [
      ...(contextualFilter.tags || []),
      "빠른서비스",
      "간단한",
    ];
    contextualFilter.maxDistance = Math.min(settings.maxDistance, 1.0);
  }

  // 그룹 크기 고려
  if (
    settings.contextualFactors.groupSize &&
    settings.contextualFactors.groupSize > 4
  ) {
    contextualFilter.tags = [
      ...(contextualFilter.tags || []),
      "넓은",
      "단체석",
    ];
  }

  const filtered = advancedFilter(restaurants, contextualFilter, weather);

  // 컨텍스트에 맞는 정렬 기준
  const sortCriteria: SortCriteria[] = [];

  if (settings.contextualFactors.occasion === "date") {
    sortCriteria.push(
      { field: "rating", direction: "desc", weight: 0.4 },
      { field: "weatherScore", direction: "desc", weight: 0.3 },
      { field: "distance", direction: "asc", weight: 0.3 }
    );
  } else if (settings.contextualFactors.timeConstraint === "quick") {
    sortCriteria.push(
      { field: "distance", direction: "asc", weight: 0.5 },
      { field: "rating", direction: "desc", weight: 0.3 },
      { field: "userScore", direction: "desc", weight: 0.2 }
    );
  } else {
    sortCriteria.push(
      { field: "userScore", direction: "desc", weight: 0.4 },
      { field: "weatherScore", direction: "desc", weight: 0.3 },
      { field: "distance", direction: "asc", weight: 0.3 }
    );
  }

  return multiCriteriaSort(filtered, sortCriteria, weather, userLocation).slice(
    0,
    10
  );
}

// 다양성을 고려한 추천
export function diversifiedRecommendation(
  restaurants: Restaurant[],
  weather: WeatherInfo,
  userLocation: UserLocation,
  settings: EnhancedRecommendationSettings
): Restaurant[] {
  // 먼저 기본 추천 받기
  const baseRecommendations = contextualRecommendation(
    restaurants,
    weather,
    userLocation,
    settings
  );

  // 카테고리별로 그룹화
  const categoryGroups = new Map<string, Restaurant[]>();
  baseRecommendations.forEach((restaurant) => {
    if (!categoryGroups.has(restaurant.category)) {
      categoryGroups.set(restaurant.category, []);
    }
    categoryGroups.get(restaurant.category)!.push(restaurant);
  });

  // 각 카테고리에서 최대 2개씩 선택하여 다양성 보장
  const diversified: Restaurant[] = [];
  const categories = Array.from(categoryGroups.keys());

  let maxPerCategory = Math.floor(10 / categories.length);
  if (maxPerCategory < 1) maxPerCategory = 1;

  categories.forEach((category) => {
    const categoryRestaurants = categoryGroups.get(category)!;
    diversified.push(
      ...categoryRestaurants.slice(0, Math.min(maxPerCategory, 2))
    );
  });

  // 부족한 만큼 상위 점수로 채우기
  if (diversified.length < 10) {
    const remaining = baseRecommendations.filter(
      (r) => !diversified.includes(r)
    );
    diversified.push(...remaining.slice(0, 10 - diversified.length));
  }

  return diversified.slice(0, 10);
}

// 실시간 학습을 위한 피드백 처리
export interface UserFeedback {
  restaurantId: string;
  rating: number; // 1-5
  visited: boolean;
  liked: boolean;
  tags: string[]; // 사용자가 추가한 태그
}

export class RecommendationLearner {
  private userHistory: UserFeedback[] = [];

  addFeedback(feedback: UserFeedback) {
    this.userHistory.push(feedback);
    this.updateUserPreferences();
  }

  private updateUserPreferences() {
    // 사용자 피드백을 바탕으로 선호도 업데이트
    // 실제 구현에서는 로컬 스토리지나 서버에 저장
  }

  getPersonalizedScore(restaurant: Restaurant): number {
    let score = 0;

    // 과거 방문/좋아요 이력 기반 점수
    const similarRestaurants = this.userHistory.filter(
      (h) =>
        h.liked &&
        (restaurant.category ===
          this.getRestaurantById(h.restaurantId)?.category ||
          restaurant.cuisine ===
            this.getRestaurantById(h.restaurantId)?.cuisine)
    );

    score += similarRestaurants.length * 0.5;

    return score;
  }

  private getRestaurantById(id: string): Restaurant | undefined {
    // 실제 구현에서는 레스토랑 데이터에서 검색
    return undefined;
  }
}

// 유틸리티 함수들
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
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
