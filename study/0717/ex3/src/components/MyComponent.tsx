import { useRef } from "react";

export default function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="p-4 m-4 border-2 border-red-500">
      <input
        ref={inputRef}
        className="border-2 border-blue-500 p-2"
        type="text"
      />
      <button onClick={focusInput} className="bg-green-300 p-2 ml-2">
        포커스 주기
      </button>
    </div>
  );
}
