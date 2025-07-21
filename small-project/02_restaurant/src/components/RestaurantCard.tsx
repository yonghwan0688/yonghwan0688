import React from "react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../types/restaurant";

interface Props {
  restaurant: Restaurant;
  distance?: number;
  isFavorite?: boolean;
  onFavorite?: (id: number) => void;
}

function RestaurantCard({
  restaurant,
  distance,
  isFavorite,
  onFavorite,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="RestaurantCard"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={restaurant.image || "https://via.placeholder.com/80"}
        alt={restaurant.name}
      />
      <div className="info">
        <h2>
          {restaurant.name}
          <button
            style={{
              marginLeft: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isFavorite ? "#ff5252" : "#bbb",
              fontSize: "1.2em",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite && onFavorite(restaurant.id);
            }}
            aria-label="찜"
          >
            ♥
          </button>
        </h2>
        {restaurant.rating && <p>⭐ {restaurant.rating.toFixed(1)} / 5.0</p>}
        {restaurant.address && <p>{restaurant.address}</p>}
        {restaurant.phone && <p>☎ {restaurant.phone}</p>}
        {distance !== undefined && (
          <span className="distance">{distance.toFixed(1)}m</span>
        )}
      </div>
    </div>
  );
}

export default RestaurantCard;
