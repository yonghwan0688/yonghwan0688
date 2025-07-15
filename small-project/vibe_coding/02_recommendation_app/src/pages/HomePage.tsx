import React, { useState } from "react";
import styled from "styled-components";
import { RecommendationSettings } from "../types";
import { useRecommendation } from "../hooks/useRecommendation";
import WeatherCard from "../components/WeatherCard";
import SettingsPanel from "../components/SettingsPanel";
import RestaurantList from "../components/RestaurantList";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage: React.FC = () => {
  const {
    loading,
    error,
    weather,
    userLocation,
    recommendations,
    getRecommendations,
  } = useRecommendation();

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"BFS" | "DFS">(
    "BFS"
  );
  const [settings, setSettings] = useState<RecommendationSettings>({
    maxDistance: 2.0,
    priceRange: [1, 2, 3],
    mealType: "any",
    cuisinePreferences: [],
    dietaryRestrictions: [],
  });

  const handleSearch = () => {
    getRecommendations(selectedAlgorithm, settings);
  };

  return (
    <Container>
      <Header>
        <Title>🍽️ 뭐먹지?</Title>
        <Subtitle>귀찮은 현대인을 위한 AI 음식 추천</Subtitle>
      </Header>

      <Content>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {weather && userLocation && (
          <WeatherCard weather={weather} location={userLocation} />
        )}

        <SettingsPanel
          algorithm={selectedAlgorithm}
          settings={settings}
          onAlgorithmChange={setSelectedAlgorithm}
          onSettingsChange={setSettings}
          onSearch={handleSearch}
          loading={loading}
        />

        {loading && <LoadingSpinner />}

        {recommendations && !loading && (
          <RestaurantList recommendations={recommendations} />
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ErrorMessage = styled.div`
  background: #ff6b6b;
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
`;

export default HomePage;
