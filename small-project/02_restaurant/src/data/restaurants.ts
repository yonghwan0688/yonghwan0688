import { Restaurant } from "../types/restaurant";

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "맛있는 식당",
    address: "서울시 강남구",
    rating: 4.5,
    image: "https://via.placeholder.com/150",
    description: "한국 전통음식 전문점",
    latitude: 37.5665, // 예시 위도
    longitude: 126.978, // 예시 경도
    phone: "02-123-4567", // 전화번호 추가
    category: ["한식", "전통음식"], // 카테고리 추가
  },
  {
    id: 2,
    name: "이탈리안 레스토랑",
    address: "서울시 종로구",
    rating: 4.2,
    image: "https://via.placeholder.com/150",
    description: "정통 이탈리안 요리",
    latitude: 37.5759, // 예시 위도
    longitude: 126.976, // 예시 경도
    phone: "02-987-6543", // 전화번호 추가
    category: ["이탈리안", "피자"], // 카테고리 추가
  },
];

export {};
