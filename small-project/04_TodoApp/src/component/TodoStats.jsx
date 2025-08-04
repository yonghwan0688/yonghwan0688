// TodoStats.jsx
function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.done).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (total === 0) {
    return null;
  }

  return (
    <div className="stats">
      <div style={{ marginBottom: "5px" }}>
        📊 <strong>통계</strong>
      </div>
      <div>
        전체: {total}개 | 완료: {completed}개 | 진행중: {active}개 | 완료율:{" "}
        {completionRate}%
      </div>
      {completionRate === 100 && (
        <div style={{ marginTop: "5px", color: "#28a745", fontWeight: "bold" }}>
          🎉 모든 할 일을 완료했습니다!
        </div>
      )}
    </div>
  );
}

export default TodoStats;
