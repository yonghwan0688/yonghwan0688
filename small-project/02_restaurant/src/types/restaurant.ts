export interface Review {
  user: string;
  content: string;
  rating: number;
  date: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  rating: number;
  image: string;
  description: string;
  latitude: number; // 추가
  longitude: number; // 추가
  phone?: string; // 전화번호 추가
  category?: string[]; // 카테고리 추가
  reviews?: Review[];
}
