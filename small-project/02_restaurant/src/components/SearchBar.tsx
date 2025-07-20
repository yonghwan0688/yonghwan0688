import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="레스토랑 이름을 검색하세요"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{ margin: "16px 0", padding: "8px", width: "100%" }}
  />
);

export default SearchBar;
