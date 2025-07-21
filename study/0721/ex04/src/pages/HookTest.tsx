import LayoutEffectExample from "../components/LayoutEffectExample";
import IdExample from "../components/IdExample";
import Transition from "../components/TransitionExample";
import ParentComponent from "../components/ParentComponent";

export default function HookTest() {
  return (
    <div>
      <h2>Hook 테스트</h2>
      <LayoutEffectExample />
      <IdExample />
      <Transition />
      <ParentComponent />
    </div>
  );
}
