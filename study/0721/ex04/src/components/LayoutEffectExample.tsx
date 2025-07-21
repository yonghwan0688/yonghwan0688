import React, { useLayoutEffect, useRef, useEffect } from "react";

export default function LayoutEffectExample() {
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (boxRef.current instanceof HTMLElement) {
      boxRef.current.style.backgroundColor = "yellow";
      boxRef.current.style.width = "300px";
    }
  }, []);

  //   useEffect(() => {
  //     if (boxRef.current instanceof HTMLElement) {
  //       boxRef.current.style.backgroundColor = "yellow";
  //       boxRef.current.style.width = "300px";
  //     }
  //   }, []);

  return <div ref={boxRef}>useLayoutEffect로 스타일 적용</div>;
}
