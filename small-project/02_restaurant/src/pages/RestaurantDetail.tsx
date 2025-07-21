import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import MapView from "../components/MapView";

function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find((r) => r.id === Number(id));
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const handleAddReview = () => {
    if (!restaurant) return;
    restaurant.reviews = restaurant.reviews || [];
    restaurant.reviews.push({
      user: "익명",
      content: reviewContent,
      rating: reviewRating,
      date: new Date().toISOString().slice(0, 10),
    });
    setReviewContent("");
    setReviewRating(5);
  };

  if (!restaurant) return <div>식당 정보를 찾을 수 없습니다.</div>;

  // 리뷰 평균 계산
  const avgReview =
    restaurant.reviews && restaurant.reviews.length > 0
      ? (
          restaurant.reviews.reduce((sum, r) => sum + r.rating, 0) /
          restaurant.reviews.length
        ).toFixed(2)
      : null;

  return (
    <div className="detail-container">
      <h2>{restaurant.name}</h2>
      <img
        src={restaurant.image}
        alt={restaurant.name}
        style={{ width: 200, borderRadius: 12 }}
      />
      <p>{restaurant.description}</p>
      <p>주소: {restaurant.address}</p>
      <p>
        평점:{" "}
        {avgReview
          ? `${avgReview} (리뷰 ${restaurant.reviews?.length}개)`
          : restaurant.rating}
      </p>
      <p>
        전화: <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
      </p>
      <p>카테고리: {restaurant.category?.join(", ")}</p>
      <MapView userLocation={null} restaurants={[restaurant]} />
      <p>
        <button
          style={{
            padding: "8px 16px",
            background: "#0078ff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "8px",
          }}
          onClick={() => {
            // 카카오맵 길찾기 링크로 이동
            window.open(
              `https://map.kakao.com/link/to/${restaurant.name},${restaurant.latitude},${restaurant.longitude}`,
              "_blank"
            );
          }}
        >
          길찾기
        </button>
      </p>
      <h3>리뷰</h3>
      <ul>
        {restaurant.reviews?.map((r, idx) => (
          <li key={idx}>
            <strong>{r.user}</strong> ({r.rating}점): {r.content}{" "}
            <span style={{ color: "#888" }}>{r.date}</span>
            <button
              style={{
                marginLeft: 8,
                background: "#eee",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                color: "#d32f2f",
                fontSize: "0.9em",
                padding: "2px 8px",
              }}
              onClick={() => {
                restaurant.reviews?.splice(idx, 1);
                // 강제로 리렌더링
                setReviewContent(reviewContent + " ");
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 16 }}>
        <textarea
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          placeholder="리뷰를 작성하세요"
          rows={3}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <br />
        <label>
          평점:
          <input
            type="number"
            min={1}
            max={5}
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
            style={{ width: "50px", marginLeft: "8px" }}
          />
        </label>
        <button onClick={handleAddReview} style={{ marginLeft: 8 }}>
          리뷰 추가
        </button>
      </div>
    </div>
  );
}

export default RestaurantDetail;
