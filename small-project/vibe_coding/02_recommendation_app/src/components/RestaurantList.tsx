import React from "react";
import styled from "styled-components";
import { RecommendationResult } from "../types";
import { calculateDistance } from "../utils/recommendation";

interface RestaurantListProps {
  recommendations: RecommendationResult;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ recommendations }) => {
  const { restaurants, algorithm, searchTime, totalSearched, criteria } =
    recommendations;

  const getPriceSymbol = (priceRange: number) => {
    return "$".repeat(priceRange);
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      "⭐".repeat(fullStars) +
      (hasHalfStar ? "✨" : "") +
      "☆".repeat(emptyStars)
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      한식: "🍚",
      중식: "🥢",
      일식: "🍣",
      양식: "🍝",
      분식: "🍢",
      패스트푸드: "🍔",
      카페: "☕",
      디저트: "🍰",
    };
    return icons[category] || "🍽️";
  };

  return (
    <Container>
      <Header>
        <Title>🎯 추천 결과</Title>
        <SearchInfo>
          <InfoItem>
            알고리즘: <strong>{algorithm}</strong>
          </InfoItem>
          <InfoItem>
            검색 시간: <strong>{searchTime}ms</strong>
          </InfoItem>
          <InfoItem>
            탐색된 음식점: <strong>{totalSearched}개</strong>
          </InfoItem>
        </SearchInfo>
      </Header>

      {restaurants.length === 0 ? (
        <NoResults>
          <NoResultsIcon>😅</NoResultsIcon>
          <NoResultsText>조건에 맞는 음식점을 찾을 수 없어요</NoResultsText>
          <NoResultsSuggestion>검색 조건을 조정해보세요!</NoResultsSuggestion>
        </NoResults>
      ) : (
        <RestaurantGrid>
          {restaurants.map((restaurant, index) => {
            const distance = calculateDistance(
              criteria.location.lat,
              criteria.location.lng,
              restaurant.location.lat,
              restaurant.location.lng
            );

            return (
              <RestaurantCard key={restaurant.id}>
                <CardHeader>
                  <CategoryIcon>
                    {getCategoryIcon(restaurant.category)}
                  </CategoryIcon>
                  <Rank>#{index + 1}</Rank>
                </CardHeader>

                <RestaurantName>{restaurant.name}</RestaurantName>

                <RestaurantInfo>
                  <InfoRow>
                    <Rating>
                      {getRatingStars(restaurant.rating)}
                      <RatingValue>{restaurant.rating}</RatingValue>
                    </Rating>
                    <Price>{getPriceSymbol(restaurant.priceRange)}</Price>
                  </InfoRow>

                  <InfoRow>
                    <Category>
                      {restaurant.category} • {restaurant.cuisine}
                    </Category>
                  </InfoRow>

                  <InfoRow>
                    <Distance>📍 {distance.toFixed(1)}km</Distance>
                  </InfoRow>
                </RestaurantInfo>

                <Tags>
                  {restaurant.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>

                <Address>{restaurant.location.address}</Address>

                <ActionButtons>
                  <ActionButton primary>🗺️ 지도에서 보기</ActionButton>
                  <ActionButton>📞 전화하기</ActionButton>
                </ActionButtons>
              </RestaurantCard>
            );
          })}
        </RestaurantGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 1.5rem;
`;

const SearchInfo = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 12px 16px;
  background: #f8f9ff;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const InfoItem = styled.div`
  color: #666;
  font-size: 0.9rem;

  strong {
    color: #333;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const NoResultsText = styled.div`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 8px;
`;

const NoResultsSuggestion = styled.div`
  color: #999;
  font-size: 1rem;
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

const RestaurantCard = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;
  background: white;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CategoryIcon = styled.div`
  font-size: 1.5rem;
`;

const Rank = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const RestaurantName = styled.h3`
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.2rem;
  line-height: 1.4;
`;

const RestaurantInfo = styled.div`
  margin-bottom: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RatingValue = styled.span`
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Price = styled.div`
  color: #28a745;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Category = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const Distance = styled.div`
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #f0f2ff;
  color: #667eea;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Address = styled.div`
  color: #999;
  font-size: 0.85rem;
  margin-bottom: 16px;
  line-height: 1.4;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 10px;
  border: 1px solid ${(props) => (props.primary ? "#667eea" : "#ddd")};
  background: ${(props) => (props.primary ? "#667eea" : "white")};
  color: ${(props) => (props.primary ? "white" : "#666")};
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.primary ? "#5a6fd8" : "#f8f9ff")};
    border-color: #667eea;
  }
`;

export default RestaurantList;
