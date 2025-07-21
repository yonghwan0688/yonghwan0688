import React from "react";
import { Restaurant } from "../types/restaurant";

interface Props {
  restaurant: Restaurant;
  distance?: number; // 거리 정보 추가
}

const RestaurantCard: React.FC<Props> = ({ restaurant, distance }) => {
  return (
    <div
      className="restaurant-card"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        backgroundColor: "#fff",
        marginBottom: "16px",
      }}
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        width={150}
        height={120}
        style={{ borderRadius: "8px", objectFit: "cover" }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 8px 0" }}>{restaurant.name}</h3>
        <p style={{ margin: "0 0 4px 0" }}>{restaurant.address}</p>
        <p style={{ margin: "0 0 4px 0" }}>평점: {restaurant.rating}</p>
        {distance !== undefined && <p>거리: {distance.toFixed(2)}m</p>}
        <p style={{ margin: "0", color: "#555" }}>{restaurant.description}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
