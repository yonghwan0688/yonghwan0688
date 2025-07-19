import React, { useState } from "react";
import styled from "styled-components";
import { EnhancedRecommendationSettings, SearchFilter } from "../types";
import { useRecommendation } from "../hooks/useRecommendation";
import WeatherCard from "../components/WeatherCard";
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
    getContextualRecommendations,
    getDiversifiedRecommendations,
    searchRestaurants,
    setSearchFilter,
  } = useRecommendation();

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<
    "BFS" | "DFS" | "A_STAR" | "HYBRID"
  >("BFS");
  const [searchMode, setSearchMode] = useState<
    "basic" | "contextual" | "diversified"
  >("basic");
  const [settings, setSettings] = useState<EnhancedRecommendationSettings>({
    maxDistance: 2.0,
    priceRange: [1, 2, 3],
    mealType: "any",
    cuisinePreferences: [],
    dietaryRestrictions: [],
    algorithm: "BFS",
    searchMode: "balanced",
    userPreferences: {
      favoriteCategories: [],
      dislikedIngredients: [],
      moodTags: [],
    },
    contextualFactors: {
      occasion: "casual",
      groupSize: 1,
      timeConstraint: "leisurely",
    },
  });

  const [localSearchFilter, setLocalSearchFilter] = useState<SearchFilter>({
    keyword: "",
    fuzzySearch: false,
    minRating: 0,
    openNow: false,
    weatherOptimized: false,
  });

  const handleSearch = () => {
    const updatedSettings = { ...settings, algorithm: selectedAlgorithm };

    console.log(
      `🔍 ${selectedAlgorithm} 알고리즘으로 ${searchMode} 모드 탐색 시작...`
    );

    switch (searchMode) {
      case "contextual":
        console.log("🎯 상황 맞춤 추천 실행");
        getContextualRecommendations(updatedSettings);
        break;
      case "diversified":
        console.log("🌈 다양성 우선 추천 실행");
        getDiversifiedRecommendations(updatedSettings);
        break;
      default:
        console.log("⚡ 기본 알고리즘 추천 실행");
        getRecommendations(selectedAlgorithm, updatedSettings);
    }
  };
  const handleKeywordSearch = async () => {
    if (localSearchFilter.keyword) {
      setSearchFilter(localSearchFilter);
      const results = await searchRestaurants(localSearchFilter);
      console.log("검색 결과:", results);
    }
  };

  const getAlgorithmName = (algorithm: string) => {
    switch (algorithm) {
      case "BFS":
        return "너비 우선 탐색";
      case "DFS":
        return "깊이 우선 탐색";
      case "A_STAR":
        return "A* 최적화 탐색";
      case "HYBRID":
        return "하이브리드 복합 탐색";
      default:
        return algorithm;
    }
  };

  return (
    <Container>
      <Header>
        <Title>🍽️ 뭐먹지?</Title>
        <Subtitle>정교한 AI 탐색으로 완벽한 맛집 찾기</Subtitle>
      </Header>

      <Content>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {weather && userLocation && (
          <WeatherCard weather={weather} location={userLocation} />
        )}

        {/* 고급 검색 패널 */}
        <SearchPanel>
          <SearchTitle>🔍 정교한 검색</SearchTitle>

          <SearchRow>
            <SearchInput
              type="text"
              placeholder="음식점, 음식 종류, 분위기 검색..."
              value={localSearchFilter.keyword || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocalSearchFilter({
                  ...localSearchFilter,
                  keyword: e.target.value,
                })
              }
            />
            <SearchButton onClick={handleKeywordSearch}>
              키워드 검색
            </SearchButton>
          </SearchRow>

          <SearchOptions>
            <OptionGroup>
              <label>
                <input
                  type="checkbox"
                  checked={localSearchFilter.fuzzySearch || false}
                  onChange={(e) =>
                    setLocalSearchFilter({
                      ...localSearchFilter,
                      fuzzySearch: e.target.checked,
                    })
                  }
                />
                퍼지 검색 (유사한 단어 포함)
              </label>
            </OptionGroup>

            <OptionGroup>
              <label>
                <input
                  type="checkbox"
                  checked={localSearchFilter.weatherOptimized || false}
                  onChange={(e) =>
                    setLocalSearchFilter({
                      ...localSearchFilter,
                      weatherOptimized: e.target.checked,
                    })
                  }
                />
                날씨 최적화
              </label>
            </OptionGroup>

            <OptionGroup>
              <label>
                <input
                  type="checkbox"
                  checked={localSearchFilter.openNow || false}
                  onChange={(e) =>
                    setLocalSearchFilter({
                      ...localSearchFilter,
                      openNow: e.target.checked,
                    })
                  }
                />
                지금 영업중
              </label>
            </OptionGroup>
          </SearchOptions>

          <SearchModeSelector>
            <ModeButton
              active={searchMode === "basic"}
              onClick={() => setSearchMode("basic")}
            >
              기본 추천
            </ModeButton>
            <ModeButton
              active={searchMode === "contextual"}
              onClick={() => setSearchMode("contextual")}
            >
              상황 맞춤
            </ModeButton>
            <ModeButton
              active={searchMode === "diversified"}
              onClick={() => setSearchMode("diversified")}
            >
              다양성 우선
            </ModeButton>
          </SearchModeSelector>
        </SearchPanel>

        <AlgorithmSelector>
          <AlgorithmTitle>검색 알고리즘</AlgorithmTitle>
          <AlgorithmDescription>
            • <strong>BFS</strong>: 넓이 우선 탐색 - 가까운 거리부터 체계적으로
            <br />• <strong>DFS</strong>: 깊이 우선 탐색 - 특정 조건을 깊게 분석
            <br />• <strong>A*</strong>: 휴리스틱 기반 - 가장 효율적인 경로 탐색
            <br />• <strong>HYBRID</strong>: 복합 알고리즘 - 여러 방법을 조합
          </AlgorithmDescription>
          <AlgorithmButtons>
            {(["BFS", "DFS", "A_STAR", "HYBRID"] as const).map((algo) => (
              <AlgorithmButton
                key={algo}
                active={selectedAlgorithm === algo}
                onClick={() => setSelectedAlgorithm(algo)}
              >
                {algo === "A_STAR" ? "A*" : algo}
              </AlgorithmButton>
            ))}
          </AlgorithmButtons>
        </AlgorithmSelector>

        <SettingsSection>
          <SettingsTitle>세부 설정</SettingsTitle>

          <SettingRow>
            <SettingLabel>최대 거리</SettingLabel>
            <RangeInput
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={settings.maxDistance}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxDistance: parseFloat(e.target.value),
                })
              }
            />
            <SettingValue>{settings.maxDistance}km</SettingValue>
          </SettingRow>

          <SettingRow>
            <SettingLabel>상황</SettingLabel>
            <Select
              value={settings.contextualFactors.occasion || "casual"}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contextualFactors: {
                    ...settings.contextualFactors,
                    occasion: e.target.value as any,
                  },
                })
              }
            >
              <option value="casual">캐주얼</option>
              <option value="date">데이트</option>
              <option value="business">비즈니스</option>
              <option value="family">가족 모임</option>
            </Select>
          </SettingRow>

          <SettingRow>
            <SettingLabel>시간 여유</SettingLabel>
            <Select
              value={settings.contextualFactors.timeConstraint || "leisurely"}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contextualFactors: {
                    ...settings.contextualFactors,
                    timeConstraint: e.target.value as any,
                  },
                })
              }
            >
              <option value="quick">빠르게</option>
              <option value="leisurely">여유롭게</option>
            </Select>
          </SettingRow>

          <SettingRow>
            <SettingLabel>인원 수</SettingLabel>
            <NumberInput
              type="number"
              min="1"
              max="20"
              value={settings.contextualFactors.groupSize || 1}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contextualFactors: {
                    ...settings.contextualFactors,
                    groupSize: parseInt(e.target.value),
                  },
                })
              }
            />
          </SettingRow>
        </SettingsSection>

        <ActionButton onClick={handleSearch} disabled={loading}>
          {loading ? "🔍 탐색 중..." : "🎯 정교한 추천 받기"}
        </ActionButton>

        {loading && <LoadingSpinner />}

        {recommendations && !loading && (
          <>
            <ResultsInfo>
              <InfoItem>
                <InfoLabel>알고리즘:</InfoLabel>
                <InfoValue>{recommendations.algorithm}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>탐색 시간:</InfoLabel>
                <InfoValue>{recommendations.searchTime}ms</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>검색된 총 개수:</InfoLabel>
                <InfoValue>{recommendations.totalSearched}개</InfoValue>
              </InfoItem>
              {recommendations.metadata?.averageDistance && (
                <InfoItem>
                  <InfoLabel>평균 거리:</InfoLabel>
                  <InfoValue>
                    {recommendations.metadata.averageDistance.toFixed(1)}km
                  </InfoValue>
                </InfoItem>
              )}
            </ResultsInfo>
            <RestaurantList recommendations={recommendations} />
          </>
        )}
      </Content>
    </Container>
  );
};

// 스타일 컴포넌트들
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
  background: rgba(255, 69, 58, 0.1);
  border: 1px solid rgba(255, 69, 58, 0.3);
  color: #ff453a;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
`;

const SearchPanel = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SearchTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const SearchOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const OptionGroup = styled.div`
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #555;
    font-size: 0.9rem;
    cursor: pointer;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #667eea;
    }
  }
`;

const SearchModeSelector = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const ModeButton = styled.button<{ active: boolean }>`
  padding: 10px 16px;
  border: 2px solid ${(props) => (props.active ? "#667eea" : "#e1e5e9")};
  background: ${(props) => (props.active ? "#667eea" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: ${(props) => (props.active ? "#5a6fd8" : "#f8f9ff")};
  }
`;

const AlgorithmSelector = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const AlgorithmTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
`;

const AlgorithmDescription = styled.div`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 15px;
  padding: 10px;
  background: #f8f9ff;
  border-radius: 8px;
`;

const AlgorithmButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const AlgorithmButton = styled.button<{ active: boolean }>`
  padding: 10px 18px;
  border: 2px solid ${(props) => (props.active ? "#764ba2" : "#e1e5e9")};
  background: ${(props) => (props.active ? "#764ba2" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #764ba2;
    background: ${(props) => (props.active ? "#6a4190" : "#f8f9ff")};
  }
`;

const SettingsSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SettingsTitle = styled.h4`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const SettingLabel = styled.label`
  min-width: 100px;
  color: #555;
  font-weight: 500;
  font-size: 0.9rem;
`;

const RangeInput = styled.input`
  flex: 1;
  max-width: 200px;
`;

const SettingValue = styled.span`
  min-width: 60px;
  color: #667eea;
  font-weight: 600;
`;

const Select = styled.select`
  flex: 1;
  max-width: 200px;
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const NumberInput = styled.input`
  width: 80px;
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ResultsInfo = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 15px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
`;

export default HomePage;
