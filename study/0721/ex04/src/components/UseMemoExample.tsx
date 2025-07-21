import React, { useState, useMemo } from "react";

function slowFunction(num: number) {
  console.log("무거운 계산 실행중");
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num * Math.random();
  }
  return result;
}

export default function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(false);

  const expensiveValue = useMemo(() => {
    return slowFunction(count);
  }, [count]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>useMemo 예제</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count)}>+0</button>
      <button onClick={() => setOther(!other)}>
        Toggle: {other.toString()}
      </button>
      <p>계산결과: {expensiveValue.toFixed(2)}</p>
    </div>
  );
}
