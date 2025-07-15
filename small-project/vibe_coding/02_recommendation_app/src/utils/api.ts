import axios from "axios";
import { WeatherInfo } from "../types";

// 날씨 API 키 (환경변수에서 가져오기)
const WEATHER_API_KEY =
  process.env.REACT_APP_WEATHER_API_KEY || "your-api-key-here";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

// 날씨 조건 매핑
const mapWeatherCondition = (condition: string): string => {
  const conditionMap: { [key: string]: string } = {
    clear: "sunny",
    clouds: "cloudy",
    rain: "rainy",
    drizzle: "rainy",
    thunderstorm: "rainy",
    snow: "cold",
    mist: "cloudy",
    fog: "cloudy",
  };

  return conditionMap[condition.toLowerCase()] || "cloudy";
};

// 현재 날씨 정보 가져오기
export const getCurrentWeather = async (
  lat: number,
  lng: number
): Promise<WeatherInfo> => {
  try {
    const response = await axios.get(
      `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
    );

    const data = response.data;

    return {
      temperature: Math.round(data.main.temp),
      condition: mapWeatherCondition(data.weather[0].main),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    console.error("날씨 정보를 가져오는데 실패했습니다:", error);

    // 기본값 반환
    return {
      temperature: 20,
      condition: "cloudy",
      description: "날씨 정보를 가져올 수 없습니다",
      humidity: 50,
      windSpeed: 0,
    };
  }
};

// 사용자 위치 가져오기
export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("위치 정보를 가져오는데 실패했습니다:", error);

        // 서울 강남역 기본 위치
        resolve({
          lat: 37.4979,
          lng: 127.0276,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000, // 10분
      }
    );
  });
};

// 주소를 좌표로 변환 (카카오 API)
export const geocodeAddress = async (
  address: string
): Promise<{ lat: number; lng: number } | null> => {
  // 카카오 API 키가 필요합니다
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

  if (!KAKAO_API_KEY) {
    console.warn("카카오 API 키가 설정되지 않았습니다.");
    return null;
  }

  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    const documents = response.data.documents;
    if (documents && documents.length > 0) {
      return {
        lat: parseFloat(documents[0].y),
        lng: parseFloat(documents[0].x),
      };
    }

    return null;
  } catch (error) {
    console.error("주소를 좌표로 변환하는데 실패했습니다:", error);
    return null;
  }
};
