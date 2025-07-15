import {
  Restaurant,
  GraphNode,
  RecommendationSettings,
  WeatherInfo,
  UserLocation,
} from "../types";

// 두 지점 간의 거리 계산 (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
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
};

// 레스토랑 점수 계산
export const calculateRestaurantScore = (
  restaurant: Restaurant,
  weather: WeatherInfo,
  userLocation: UserLocation,
  settings: RecommendationSettings
): number => {
  let score = 0;

  // 기본 평점 점수 (0-50점)
  score += restaurant.rating * 10;

  // 거리 점수 (가까울수록 높은 점수, 0-20점)
  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    restaurant.location.lat,
    restaurant.location.lng
  );
  score += Math.max(0, 20 - distance * 4);

  // 날씨 적합성 점수 (0-15점)
  if (restaurant.weatherSuitable.includes(weather.condition)) {
    score += 15;
  }

  // 가격대 선호도 점수 (0-10점)
  if (settings.priceRange.includes(restaurant.priceRange)) {
    score += 10;
  }

  // 요리 선호도 점수 (0-5점)
  if (settings.cuisinePreferences.includes(restaurant.cuisine)) {
    score += 5;
  }

  return score;
};

// 그래프 생성 (인접한 레스토랑들 연결)
export const createRestaurantGraph = (
  restaurants: Restaurant[]
): Map<string, GraphNode> => {
  const graph = new Map<string, GraphNode>();

  // 모든 레스토랑을 노드로 추가
  restaurants.forEach((restaurant) => {
    graph.set(restaurant.id, {
      restaurant,
      connections: [],
      visited: false,
      distance: Infinity,
      score: 0,
    });
  });

  // 연결 생성 (1km 이내의 레스토랑들 연결)
  restaurants.forEach((restaurant) => {
    const connections: string[] = [];
    restaurants.forEach((otherRestaurant) => {
      if (restaurant.id !== otherRestaurant.id) {
        const distance = calculateDistance(
          restaurant.location.lat,
          restaurant.location.lng,
          otherRestaurant.location.lat,
          otherRestaurant.location.lng
        );
        if (distance <= 1.0) {
          // 1km 이내
          connections.push(otherRestaurant.id);
        }
      }
    });

    const node = graph.get(restaurant.id);
    if (node) {
      node.connections = connections;
    }
  });

  return graph;
};

// BFS 알고리즘으로 레스토랑 추천
export const recommendRestaurantsBFS = (
  restaurants: Restaurant[],
  weather: WeatherInfo,
  userLocation: UserLocation,
  settings: RecommendationSettings,
  startRestaurantId?: string
): Restaurant[] => {
  const graph = createRestaurantGraph(restaurants);
  const visited = new Set<string>();
  const queue: string[] = [];
  const results: { restaurant: Restaurant; score: number }[] = [];

  // 시작점 설정 (가장 가까운 레스토랑 또는 지정된 레스토랑)
  let startId = startRestaurantId;
  if (!startId) {
    let minDistance = Infinity;
    restaurants.forEach((restaurant) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurant.location.lat,
        restaurant.location.lng
      );
      if (distance < minDistance) {
        minDistance = distance;
        startId = restaurant.id;
      }
    });
  }

  if (startId) {
    queue.push(startId);
  }

  // BFS 탐색
  while (queue.length > 0) {
    const currentId = queue.shift()!;

    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const currentNode = graph.get(currentId);
    if (!currentNode) continue;

    const restaurant = currentNode.restaurant;

    // 거리 필터링
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      restaurant.location.lat,
      restaurant.location.lng
    );

    if (distance <= settings.maxDistance) {
      const score = calculateRestaurantScore(
        restaurant,
        weather,
        userLocation,
        settings
      );
      results.push({ restaurant, score });
    }

    // 연결된 노드들을 큐에 추가
    currentNode.connections.forEach((connectionId) => {
      if (!visited.has(connectionId)) {
        queue.push(connectionId);
      }
    });
  }

  // 점수순으로 정렬하여 반환
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((item) => item.restaurant);
};

// DFS 알고리즘으로 레스토랑 추천
export const recommendRestaurantsDFS = (
  restaurants: Restaurant[],
  weather: WeatherInfo,
  userLocation: UserLocation,
  settings: RecommendationSettings,
  startRestaurantId?: string
): Restaurant[] => {
  const graph = createRestaurantGraph(restaurants);
  const visited = new Set<string>();
  const results: { restaurant: Restaurant; score: number }[] = [];

  // 시작점 설정
  let startId = startRestaurantId;
  if (!startId) {
    let minDistance = Infinity;
    restaurants.forEach((restaurant) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurant.location.lat,
        restaurant.location.lng
      );
      if (distance < minDistance) {
        minDistance = distance;
        startId = restaurant.id;
      }
    });
  }

  // DFS 재귀 함수
  const dfsSearch = (currentId: string): void => {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    const currentNode = graph.get(currentId);
    if (!currentNode) return;

    const restaurant = currentNode.restaurant;

    // 거리 필터링
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      restaurant.location.lat,
      restaurant.location.lng
    );

    if (distance <= settings.maxDistance) {
      const score = calculateRestaurantScore(
        restaurant,
        weather,
        userLocation,
        settings
      );
      results.push({ restaurant, score });
    }

    // 연결된 노드들을 재귀적으로 탐색
    currentNode.connections.forEach((connectionId) => {
      if (!visited.has(connectionId)) {
        dfsSearch(connectionId);
      }
    });
  };

  if (startId) {
    dfsSearch(startId);
  }

  // 점수순으로 정렬하여 반환
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((item) => item.restaurant);
};
