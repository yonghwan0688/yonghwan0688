import { useState, useEffect } from "react";
function App2() {
  const [count, setCount] = useState(0);
  //   useEffect(() => {
  //     console.log("useEffect 실행");
  //     setTimeout(() => {
  //       alert("환영합니다.");
  //     }, 3000);
  //   }, []);

  useEffect(() => {
    console.log("useEffect 실행");
  }, [count]); // count가 변경될 때마다 실행

  const countUp = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>useEffect</h2>
      <button onClick={countUp}>카운트 증가</button>
    </div>
  );
}

export default App2;
