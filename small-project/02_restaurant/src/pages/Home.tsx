import React from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

interface Props {
  restaurants: { restaurant: any; distance: number }[];
}

const Home: React.FC<Props> = ({ restaurants }) => {
  const navigate = useNavigate();

  return (
    <div>
      {restaurants.map(({ restaurant, distance }) => (
        <div
          key={restaurant.id}
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        >
          <RestaurantCard restaurant={restaurant} distance={distance} />
        </div>
      ))}
    </div>
  );
};

export default Home;
