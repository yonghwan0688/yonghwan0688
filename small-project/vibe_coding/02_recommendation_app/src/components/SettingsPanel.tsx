import React from "react";
import styled from "styled-components";
import { RecommendationSettings } from "../types";

interface SettingsPanelProps {
  algorithm: "BFS" | "DFS";
  settings: RecommendationSettings;
  onAlgorithmChange: (algorithm: "BFS" | "DFS") => void;
  onSettingsChange: (settings: RecommendationSettings) => void;
  onSearch: () => void;
  loading: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  algorithm,
  settings,
  onAlgorithmChange,
  onSettingsChange,
  onSearch,
  loading,
}) => {
  const handleDistanceChange = (value: number) => {
    onSettingsChange({ ...settings, maxDistance: value });
  };

  const handlePriceRangeChange = (price: number, checked: boolean) => {
    const newPriceRange = checked
      ? [...settings.priceRange, price]
      : settings.priceRange.filter((p) => p !== price);
    onSettingsChange({ ...settings, priceRange: newPriceRange });
  };

  const handleMealTypeChange = (mealType: "lunch" | "dinner" | "any") => {
    onSettingsChange({ ...settings, mealType });
  };

  const cuisineOptions = [
    "한식",
    "중식",
    "일식",
    "양식",
    "분식",
    "치킨",
    "피자",
    "버거",
    "카페",
    "디저트",
  ];

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    const newCuisines = checked
      ? [...settings.cuisinePreferences, cuisine]
      : settings.cuisinePreferences.filter((c) => c !== cuisine);
    onSettingsChange({ ...settings, cuisinePreferences: newCuisines });
  };

  return (
    <Panel>
      <Title>🎯 맞춤 설정</Title>

      <Section>
        <SectionTitle>검색 알고리즘</SectionTitle>
        <AlgorithmContainer>
          <AlgorithmButton
            active={algorithm === "BFS"}
            onClick={() => onAlgorithmChange("BFS")}
          >
            BFS (넓이 우선)
          </AlgorithmButton>
          <AlgorithmButton
            active={algorithm === "DFS"}
            onClick={() => onAlgorithmChange("DFS")}
          >
            DFS (깊이 우선)
          </AlgorithmButton>
        </AlgorithmContainer>
        <AlgorithmDescription>
          {algorithm === "BFS"
            ? "주변 음식점을 골고루 탐색하여 다양한 선택지를 제공합니다."
            : "특정 경로를 깊이 탐색하여 연관성 높은 음식점을 찾습니다."}
        </AlgorithmDescription>
      </Section>

      <Section>
        <SectionTitle>검색 반경</SectionTitle>
        <DistanceSlider>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={settings.maxDistance}
            onChange={(e) => handleDistanceChange(parseFloat(e.target.value))}
          />
          <DistanceValue>{settings.maxDistance}km</DistanceValue>
        </DistanceSlider>
      </Section>

      <Section>
        <SectionTitle>가격대</SectionTitle>
        <PriceContainer>
          {[1, 2, 3, 4].map((price) => (
            <PriceButton
              key={price}
              active={settings.priceRange.includes(price)}
              onClick={() =>
                handlePriceRangeChange(
                  price,
                  !settings.priceRange.includes(price)
                )
              }
            >
              {"$".repeat(price)}
            </PriceButton>
          ))}
        </PriceContainer>
      </Section>

      <Section>
        <SectionTitle>식사 시간</SectionTitle>
        <MealTypeContainer>
          {[
            { value: "lunch", label: "점심" },
            { value: "dinner", label: "저녁" },
            { value: "any", label: "상관없음" },
          ].map((meal) => (
            <MealButton
              key={meal.value}
              active={settings.mealType === meal.value}
              onClick={() => handleMealTypeChange(meal.value as any)}
            >
              {meal.label}
            </MealButton>
          ))}
        </MealTypeContainer>
      </Section>

      <Section>
        <SectionTitle>음식 종류</SectionTitle>
        <CuisineContainer>
          {cuisineOptions.map((cuisine) => (
            <CuisineTag
              key={cuisine}
              active={settings.cuisinePreferences.includes(cuisine)}
              onClick={() =>
                handleCuisineChange(
                  cuisine,
                  !settings.cuisinePreferences.includes(cuisine)
                )
              }
            >
              {cuisine}
            </CuisineTag>
          ))}
        </CuisineContainer>
      </Section>

      <SearchButton onClick={onSearch} disabled={loading}>
        {loading ? "검색 중..." : "🔍 맛집 추천받기"}
      </SearchButton>
    </Panel>
  );
};

const Panel = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0 0 24px 0;
  color: #333;
  font-size: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #555;
  font-size: 1.1rem;
  font-weight: 600;
`;

const AlgorithmContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;

const AlgorithmButton = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border: 2px solid ${(props) => (props.active ? "#667eea" : "#ddd")};
  background: ${(props) => (props.active ? "#667eea" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    background: ${(props) => (props.active ? "#5a6fd8" : "#f8f9ff")};
  }
`;

const AlgorithmDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 8px 0 0 0;
  line-height: 1.4;
`;

const DistanceSlider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  input[type="range"] {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: #ddd;
    outline: none;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #667eea;
      cursor: pointer;
    }
  }
`;

const DistanceValue = styled.div`
  font-weight: 600;
  color: #667eea;
  min-width: 50px;
`;

const PriceContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const PriceButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${(props) => (props.active ? "#667eea" : "#ddd")};
  background: ${(props) => (props.active ? "#667eea" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

const MealTypeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const MealButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${(props) => (props.active ? "#667eea" : "#ddd")};
  background: ${(props) => (props.active ? "#667eea" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

const CuisineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CuisineTag = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${(props) => (props.active ? "#667eea" : "#ddd")};
  background: ${(props) => (props.active ? "#667eea" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default SettingsPanel;
