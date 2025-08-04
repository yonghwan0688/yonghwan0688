// App.jsx
import { useState, useCallback, useEffect } from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import TodoFilter from "./component/TodoFilter";
import TodoStats from "./component/TodoStats";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all, active, completed

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // 로컬 스토리지에 데이터 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: text.trim(),
        done: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const editTodo = useCallback((id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  }, []);

  // 필터링된 할 일 목록
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.done;
      case "completed":
        return todo.done;
      default:
        return true;
    }
  });

  return (
    <div className="app">
      <h1 className="app-title">📝 Todo List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
        hasCompleted={todos.some((todo) => todo.done)}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
      <TodoStats todos={todos} />
    </div>
  );
}

export default App;
