import { Restaurant, WeatherInfo, UserLocation } from "../types";

// 퍼지 검색을 위한 Levenshtein Distance 계산
export function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

// 문자열 유사도 계산 (0-1 사이 값)
export function similarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

// 퍼지 텍스트 검색
export function fuzzySearch(
  query: string,
  text: string,
  threshold: number = 0.6
): boolean {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();

  // 정확한 매치
  if (textLower.includes(queryLower)) return true;

  // 단어별 퍼지 매치
  const queryWords = queryLower.split(/\s+/);
  const textWords = textLower.split(/\s+/);

  return queryWords.every((queryWord) =>
    textWords.some((textWord) => similarity(queryWord, textWord) >= threshold)
  );
}

// 다중 기준 정렬
export interface SortCriteria {
  field: keyof Restaurant | "distance" | "weatherScore" | "userScore";
  direction: "asc" | "desc";
  weight: number; // 가중치 (0-1)
}

export function multiCriteriaSort(
  restaurants: Restaurant[],
  criteria: SortCriteria[],
  weather?: WeatherInfo,
  userLocation?: UserLocation
): Restaurant[] {
  return restaurants.sort((a, b) => {
    let totalScore = 0;

    for (const criterion of criteria) {
      let score = 0;

      switch (criterion.field) {
        case "rating":
          score =
            (a.rating - b.rating) * (criterion.direction === "desc" ? -1 : 1);
          break;
        case "distance":
          const aDistance = a.location.distance || 0;
          const bDistance = b.location.distance || 0;
          score =
            (aDistance - bDistance) * (criterion.direction === "desc" ? -1 : 1);
          break;
        case "priceRange":
          score =
            (a.priceRange - b.priceRange) *
            (criterion.direction === "desc" ? -1 : 1);
          break;
        case "weatherScore":
          if (weather) {
            const aWeatherScore = calculateWeatherScore(a, weather);
            const bWeatherScore = calculateWeatherScore(b, weather);
            score =
              (aWeatherScore - bWeatherScore) *
              (criterion.direction === "desc" ? -1 : 1);
          }
          break;
        case "userScore":
          const aUserScore = calculateUserScore(a);
          const bUserScore = calculateUserScore(b);
          score =
            (aUserScore - bUserScore) *
            (criterion.direction === "desc" ? -1 : 1);
          break;
      }

      totalScore += score * criterion.weight;
    }

    return totalScore;
  });
}

// 날씨 점수 계산
function calculateWeatherScore(
  restaurant: Restaurant,
  weather: WeatherInfo
): number {
  let score = 0;

  // 날씨에 적합한 음식점인지 확인
  if (restaurant.weatherSuitable.includes(weather.condition)) {
    score += 3;
  }

  // 온도에 따른 점수
  if (weather.temperature > 25) {
    // 더운 날씨
    if (
      restaurant.tags.includes("시원한") ||
      restaurant.tags.includes("냉면") ||
      restaurant.tags.includes("아이스크림")
    ) {
      score += 2;
    }
  } else if (weather.temperature < 10) {
    // 추운 날씨
    if (
      restaurant.tags.includes("뜨거운") ||
      restaurant.tags.includes("따뜻한") ||
      restaurant.tags.includes("국물")
    ) {
      score += 2;
    }
  }

  // 비 오는 날씨
  if (weather.condition === "rainy") {
    if (
      restaurant.tags.includes("따뜻한") ||
      restaurant.tags.includes("국물") ||
      restaurant.category === "찜/탕"
    ) {
      score += 2;
    }
  }

  return score;
}

// 사용자 선호도 점수 계산
function calculateUserScore(restaurant: Restaurant): number {
  // 평점과 가격대를 기반으로 한 기본 점수
  return restaurant.rating * 0.7 + (5 - restaurant.priceRange) * 0.3;
}

// 고급 필터링
export interface AdvancedFilter {
  keyword?: string;
  fuzzyKeyword?: string;
  minRating?: number;
  maxDistance?: number;
  priceRanges?: number[];
  cuisines?: string[];
  tags?: string[];
  openNow?: boolean;
  weatherOptimized?: boolean;
}

export function advancedFilter(
  restaurants: Restaurant[],
  filter: AdvancedFilter,
  weather?: WeatherInfo,
  currentTime?: Date
): Restaurant[] {
  return restaurants.filter((restaurant) => {
    // 키워드 검색
    if (filter.keyword) {
      const searchFields = [
        restaurant.name,
        restaurant.category,
        restaurant.cuisine,
        restaurant.location.address,
        ...restaurant.tags,
      ].join(" ");

      if (!searchFields.toLowerCase().includes(filter.keyword.toLowerCase())) {
        return false;
      }
    }

    // 퍼지 키워드 검색
    if (filter.fuzzyKeyword) {
      const searchFields = [
        restaurant.name,
        restaurant.category,
        restaurant.cuisine,
        ...restaurant.tags,
      ].join(" ");

      if (!fuzzySearch(filter.fuzzyKeyword, searchFields)) {
        return false;
      }
    }

    // 최소 평점
    if (filter.minRating && restaurant.rating < filter.minRating) {
      return false;
    }

    // 최대 거리
    if (
      filter.maxDistance &&
      restaurant.location.distance &&
      restaurant.location.distance > filter.maxDistance
    ) {
      return false;
    }

    // 가격대
    if (
      filter.priceRanges &&
      filter.priceRanges.length > 0 &&
      !filter.priceRanges.includes(restaurant.priceRange)
    ) {
      return false;
    }

    // 요리 종류
    if (
      filter.cuisines &&
      filter.cuisines.length > 0 &&
      !filter.cuisines.includes(restaurant.cuisine)
    ) {
      return false;
    }

    // 태그
    if (filter.tags && filter.tags.length > 0) {
      const hasRequiredTag = filter.tags.some((tag) =>
        restaurant.tags.includes(tag)
      );
      if (!hasRequiredTag) {
        return false;
      }
    }

    // 현재 영업 중인지 확인
    if (filter.openNow && currentTime) {
      const dayOfWeek = currentTime
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentTimeString = `${currentHour
        .toString()
        .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

      const todayHours = restaurant.openHours[dayOfWeek];
      if (!todayHours) {
        return false; // 오늘 휴무
      }

      const openTime = todayHours.open;
      const closeTime = todayHours.close;

      if (currentTimeString < openTime || currentTimeString > closeTime) {
        return false;
      }
    }

    // 날씨 최적화
    if (filter.weatherOptimized && weather) {
      const weatherScore = calculateWeatherScore(restaurant, weather);
      if (weatherScore < 2) {
        return false;
      }
    }

    return true;
  });
}

// 클러스터링을 위한 거리 기반 그룹화
export function clusterByDistance(
  restaurants: Restaurant[],
  maxClusterDistance: number = 0.5
): Restaurant[][] {
  const clusters: Restaurant[][] = [];
  const visited = new Set<string>();

  for (const restaurant of restaurants) {
    if (visited.has(restaurant.id)) continue;

    const cluster: Restaurant[] = [restaurant];
    visited.add(restaurant.id);

    for (const other of restaurants) {
      if (visited.has(other.id)) continue;

      const distance = calculateDistance(
        restaurant.location.lat,
        restaurant.location.lng,
        other.location.lat,
        other.location.lng
      );

      if (distance <= maxClusterDistance) {
        cluster.push(other);
        visited.add(other.id);
      }
    }

    clusters.push(cluster);
  }

  return clusters;
}

// 하버사인 공식을 사용한 거리 계산
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
