import React, { useState, useTransition } from "react";

export default function Transition() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    startTransition(() => {
      const items = [];
      for (let i = 0; i < 100000000; i++) {
        items.push(e.target.value + i);
      }
      setList(items);
    });
  };
  return (
    <div>
      <input value={input} onChange={handleChange} type="text" />
      {isPending && <span>로딩중...</span>}
      {/* {!isPending && <div>완료!</div>} */}
      <div>총 {list.length}개</div>
    </div>
  );
}
