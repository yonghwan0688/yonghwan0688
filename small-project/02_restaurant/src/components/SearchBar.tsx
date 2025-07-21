import React, { useState } from "react";
import { Restaurant } from "../types/restaurant";
import { restaurants } from "../data/restaurants";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

function SearchBar({ value, onChange }: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = value
    ? restaurants
        .filter((r) => r.name.includes(value))
        .map((r) => r.name)
        .slice(0, 5)
    : [];

  return (
    <div className="SearchBar" style={{ position: "relative" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        placeholder="식당 이름을 검색하세요"
        style={{
          width: "60%",
          padding: "10px 16px",
          borderRadius: "8px",
          margin: "16px 0",
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            left: 0,
            top: "40px",
            width: "100%",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            zIndex: 10,
            listStyle: "none",
            margin: 0,
            padding: "4px 0",
          }}
        >
          {suggestions.map((name, idx) => (
            <li
              key={idx}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onMouseDown={() => {
                onChange(name);
                setShowSuggestions(false);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
