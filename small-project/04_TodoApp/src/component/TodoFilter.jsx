// TodoFilter.jsx
function TodoFilter({
  currentFilter,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}) {
  const filters = [
    { key: "all", label: "전체", emoji: "📝" },
    { key: "active", label: "진행중", emoji: "⏳" },
    { key: "completed", label: "완료", emoji: "✅" },
  ];

  return (
    <div className="filter-section">
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-button ${
              currentFilter === filter.key ? "active" : ""
            }`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.emoji} {filter.label}
          </button>
        ))}
      </div>

      {hasCompleted && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            className="clear-completed-button"
            onClick={onClearCompleted}
            style={{
              padding: "8px 16px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🗑️ 완료된 항목 삭제
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoFilter;
