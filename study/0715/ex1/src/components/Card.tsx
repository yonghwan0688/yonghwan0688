import React from "react";
import "./Card.css";

function Card() {
  return (
    <div className="card">
      <img
        className="cardImage"
        src="https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_1280.jpg"
        width="400px"
      />
      <h1 className="cardTitle">홍길동</h1>
      <h2 className="cardSubtitle">Frontend Developer</h2>
      <h3 className="cardDescription">React와 Tailwind를 배우는 중입니다.</h3>
    </div>
  );
}

export default Card;
