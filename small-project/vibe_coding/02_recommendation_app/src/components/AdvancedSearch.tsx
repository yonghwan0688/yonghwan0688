import React, { useState } from "react";
import styled from "styled-components";
import { SearchFilter } from "../types";

interface AdvancedSearchProps {
  onSearch: (filter: SearchFilter) => void;
  loading?: boolean;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  loading = false,
}) => {
  const [filter, setFilter] = useState<SearchFilter>({
    keyword: "",
    fuzzySearch: false,
    minRating: 0,
    maxDistance: 5,
    priceRanges: [1, 2, 3, 4],
    tags: [],
    openNow: false,
    weatherOptimized: false,
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = [
    "뜨거운",
    "시원한",
    "든든한",
    "가벼운",
    "매운",
    "달콤한",
    "로맨틱",
    "분위기좋은",
    "조용한",
    "시끄러워도괜찮은",
    "빠른서비스",
    "넓은",
    "아이친화적",
    "격식있는",
  ];

  const handleSearch = () => {
    const searchFilter: SearchFilter = {
      ...filter,
      tags: selectedTags,
    };
    onSearch(searchFilter);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Container>
      <Title>🔍 고급 검색</Title>

      <SearchSection>
        <Label>키워드 검색</Label>
        <InputRow>
          <SearchInput
            type="text"
            placeholder="음식점명, 음식종류, 특징..."
            value={filter.keyword || ""}
            onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
          />
          <CheckboxGroup>
            <label>
              <input
                type="checkbox"
                checked={filter.fuzzySearch || false}
                onChange={(e) =>
                  setFilter({ ...filter, fuzzySearch: e.target.checked })
                }
              />
              유사검색
            </label>
          </CheckboxGroup>
        </InputRow>
      </SearchSection>

      <SearchSection>
        <Label>필터 조건</Label>
        <FilterGrid>
          <FilterItem>
            <FilterLabel>최소 평점</FilterLabel>
            <RangeInput
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filter.minRating || 0}
              onChange={(e) =>
                setFilter({ ...filter, minRating: parseFloat(e.target.value) })
              }
            />
            <RangeValue>{filter.minRating}점</RangeValue>
          </FilterItem>

          <FilterItem>
            <FilterLabel>최대 거리</FilterLabel>
            <RangeInput
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={filter.maxDistance || 5}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  maxDistance: parseFloat(e.target.value),
                })
              }
            />
            <RangeValue>{filter.maxDistance}km</RangeValue>
          </FilterItem>
        </FilterGrid>
      </SearchSection>

      <SearchSection>
        <Label>가격대</Label>
        <PriceGrid>
          {[1, 2, 3, 4].map((price) => (
            <PriceButton
              key={price}
              active={filter.priceRanges?.includes(price) || false}
              onClick={() => {
                const currentRanges = filter.priceRanges || [];
                const newRanges = currentRanges.includes(price)
                  ? currentRanges.filter((p) => p !== price)
                  : [...currentRanges, price];
                setFilter({ ...filter, priceRanges: newRanges });
              }}
            >
              {"$".repeat(price)}
            </PriceButton>
          ))}
        </PriceGrid>
      </SearchSection>

      <SearchSection>
        <Label>분위기 & 특징</Label>
        <TagGrid>
          {availableTags.map((tag) => (
            <TagButton
              key={tag}
              active={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </TagButton>
          ))}
        </TagGrid>
      </SearchSection>

      <SearchSection>
        <OptionGrid>
          <OptionItem>
            <label>
              <input
                type="checkbox"
                checked={filter.openNow || false}
                onChange={(e) =>
                  setFilter({ ...filter, openNow: e.target.checked })
                }
              />
              지금 영업중
            </label>
          </OptionItem>
          <OptionItem>
            <label>
              <input
                type="checkbox"
                checked={filter.weatherOptimized || false}
                onChange={(e) =>
                  setFilter({ ...filter, weatherOptimized: e.target.checked })
                }
              />
              날씨 최적화
            </label>
          </OptionItem>
        </OptionGrid>
      </SearchSection>

      <SearchButton onClick={handleSearch} disabled={loading}>
        {loading ? "🔍 검색 중..." : "🎯 고급 검색 실행"}
      </SearchButton>
    </Container>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h3`
  margin: 0 0 25px 0;
  color: #333;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
`;

const SearchSection = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.h4`
  margin: 0 0 15px 0;
  color: #555;
  font-size: 1.1rem;
  font-weight: 600;
`;

const InputRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CheckboxGroup = styled.div`
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 0.9rem;
    white-space: nowrap;

    input[type="checkbox"] {
      accent-color: #667eea;
    }
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterLabel = styled.span`
  min-width: 80px;
  color: #666;
  font-size: 0.9rem;
`;

const RangeInput = styled.input`
  flex: 1;
`;

const RangeValue = styled.span`
  min-width: 50px;
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
`;

const PriceGrid = styled.div`
  display: flex;
  gap: 10px;
`;

const PriceButton = styled.button<{ active: boolean }>`
  padding: 10px 16px;
  border: 2px solid ${(props) => (props.active ? "#667eea" : "#e1e5e9")};
  background: ${(props) => (props.active ? "#667eea" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: ${(props) => (props.active ? "#5a6fd8" : "#f8f9ff")};
  }
`;

const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  border: 2px solid ${(props) => (props.active ? "#764ba2" : "#e1e5e9")};
  background: ${(props) => (props.active ? "#764ba2" : "white")};
  color: ${(props) => (props.active ? "white" : "#666")};
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #764ba2;
    background: ${(props) => (props.active ? "#6a4190" : "#f8f9ff")};
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OptionItem = styled.div`
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 0.9rem;
    cursor: pointer;

    input[type="checkbox"] {
      accent-color: #667eea;
    }
  }
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default AdvancedSearch;
