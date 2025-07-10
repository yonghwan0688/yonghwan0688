import { Title, Icon, Subtitle } from "../components";

export default function DivTest() {
  return (
    <section className="mt-4">
      <Title>DivTest</Title>
      <div
        className="text-center text-blue-100 bg-blue-600"
        style={{ height: "6rem" }}
      >
        <Icon name="home" className="text-3xl" style={{}} />
        <Subtitle>Home</Subtitle>
      </div>
    </section>
  );
}
