import React from "react";
import styled from "styled-components";
import { WeatherInfo, UserLocation } from "../types";

interface WeatherCardProps {
  weather: WeatherInfo;
  location: UserLocation;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, location }) => {
  const getWeatherIcon = (condition: string) => {
    const icons: { [key: string]: string } = {
      sunny: "☀️",
      cloudy: "☁️",
      rainy: "🌧️",
      cold: "❄️",
      hot: "🌡️",
    };
    return icons[condition] || "🌤️";
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "#74c0fc";
    if (temp <= 10) return "#91a7ff";
    if (temp <= 20) return "#51cf66";
    if (temp <= 30) return "#ffd43b";
    return "#ff8787";
  };

  return (
    <Card>
      <WeatherSection>
        <IconContainer>
          <WeatherIcon>{getWeatherIcon(weather.condition)}</WeatherIcon>
          <Temperature color={getTemperatureColor(weather.temperature)}>
            {weather.temperature}°C
          </Temperature>
        </IconContainer>
        <WeatherDetails>
          <Description>{weather.description}</Description>
          <Details>
            <DetailItem>💧 습도: {weather.humidity}%</DetailItem>
            <DetailItem>💨 바람: {weather.windSpeed}m/s</DetailItem>
          </Details>
        </WeatherDetails>
      </WeatherSection>

      <LocationSection>
        <LocationIcon>📍</LocationIcon>
        <LocationText>
          현재 위치:{" "}
          {location.address ||
            `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
        </LocationText>
      </LocationSection>
    </Card>
  );
};

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WeatherSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const WeatherIcon = styled.div`
  font-size: 3rem;
`;

const Temperature = styled.div<{ color: string }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const WeatherDetails = styled.div`
  flex: 1;
`;

const Description = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const Details = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const LocationSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

const LocationIcon = styled.div`
  font-size: 1.2rem;
`;

const LocationText = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

export default WeatherCard;
