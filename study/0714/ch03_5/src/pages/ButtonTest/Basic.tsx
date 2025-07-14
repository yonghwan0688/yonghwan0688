import { Button } from "../../theme/daisyui";

export default function Basic() {
  return (
    <section className="mt-4">
      <h2 className="font-bold text-3xl text-center">Baisc</h2>
      <div className="mt-4 flex justify-evenly">
        <button className="btn btn-primary">DAISYUI BUTTON</button>
        <Button className="btn btn-primary">BUTTON</Button>
      </div>
    </section>
  );
}
