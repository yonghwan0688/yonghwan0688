import Basic from "./Basic";
import Color from "./Color";
import Border from "./Border";
import Size from "./Size";

export default function InputTest() {
  return (
    <section className="space-y-8">
      <Size />
      <Border />
      <Color />
      <Basic />
    </section>
  );
}
