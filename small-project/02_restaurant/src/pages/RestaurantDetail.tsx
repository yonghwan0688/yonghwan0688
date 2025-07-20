import React from "react";
import { useParams } from "react-router-dom";
import { Restaurant } from "../types/restaurant";
import { restaurants } from "../data/restaurants";

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === Number(id));
  if (!restaurant) {
    return <div>레스토랑을 찾을 수 없습니다.</div>;
  }
  return (
    <div style={{ padding: 24 }}>
      <h2>{restaurant.name}</h2>
      <img src={restaurant.image} alt={restaurant.name} width={250} />
      <h1>{restaurant.name}</h1>
      <p>주소: {restaurant.address}</p>
      <p>평점: {restaurant.rating}</p>
      <p>설명: {restaurant.description}</p>
      <p>
        위치: {restaurant.latitude}, {restaurant.longitude}
      </p>
    </div>
  );
};

export default RestaurantDetail;
