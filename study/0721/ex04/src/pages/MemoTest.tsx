import ExpensiveComponents from "../components/ExpensiveComponents";
import UseMemoExample from "../components/UseMemoExample";
import Parent from "../components/parent";
import UseCallbackExample from "../components/UseCallbackExample";
import React from "react";
import CustomInput from "../components/CustomInput";

export default function MemoTest() {
  return (
    <div>
      <h2>useMemo 테스트</h2>
      <ExpensiveComponents />
      <UseMemoExample />
      <Parent />
      <CustomInput />
    </div>
  );
}
