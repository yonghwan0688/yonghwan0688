// TodoItem.jsx
import React, { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(todo.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleSave}
          autoFocus
          maxLength={100}
        />
      ) : (
        <span className={`todo-text ${todo.done ? "completed" : ""}`}>
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSave} title="저장">
              ✅
            </button>
            <button
              className="cancel-button"
              onClick={handleCancel}
              title="취소"
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <button
              className="edit-button"
              onClick={handleEdit}
              title="편집"
              disabled={todo.done}
            >
              ✏️
            </button>
            <button
              className="delete-button"
              onClick={() => onDelete(todo.id)}
              title="삭제"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default React.memo(TodoItem);
