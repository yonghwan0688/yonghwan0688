import React from "react";
import { useParams } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import { useNavigate } from "react-router-dom";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === Number(id));
  if (!restaurant) {
    return <div>레스토랑을 찾을 수 없습니다.</div>;
  }
  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        ← 목록으로
      </button>
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
