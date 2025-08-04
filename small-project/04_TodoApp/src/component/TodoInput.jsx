// TodoInput.jsx
import { useState } from "react";

function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAdd(trimmedText);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할 일을 입력하세요..."
        maxLength={100}
      />
      <button type="submit" className="add-button">
        ➕ 추가
      </button>
    </form>
  );
}

export default TodoInput;
