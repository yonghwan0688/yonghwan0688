import React from "react";
import { Restaurant } from "../types/restaurant";

interface Props {
  restaurant: Restaurant;
  distance?: number; // 거리 정보 추가
}

const RestaurantCard: React.FC<Props> = ({ restaurant, distance }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "8px" }}>
      <img src={restaurant.image} alt={restaurant.name} width={150} />
      <h3>{restaurant.name}</h3>
      <p>{restaurant.address}</p>
      <p>평점: {restaurant.rating}</p>
      <p>{restaurant.description}</p>
      {distance !== undefined && <p>거리: {distance.toFixed(2)}m</p>}
    </div>
  );
};

export default RestaurantCard;
