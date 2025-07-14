import { Div, Title, Subtitle } from "../components";
import * as D from "../data";

export default function DirectionTest() {
  const boxes = D.range(1, 9 + 1).map((number) => {
    return (
      <p key={number} className={`border-2 border-blue-300 p-1 mt-1 ml-1`}>
        {number}
      </p>
    );
  });
  return (
    <section className="mt-4">
      <title>DirectionTest</title>
      <Div className="flex flex-row mt-4">
        <Div className="mr-2">
          <Subtitle>flew-row</Subtitle>
          <Div className="flex flex-row p-4 w-[100px] overflow-x-scroll">
            {boxes}
          </Div>
        </Div>
        <Div className="mr-2">
          <Subtitle>flew-row-reverse</Subtitle>
          <div className="flex flew-row-reverse p-4">{boxes}</div>
        </Div>
        <Div className="mr-2">
          <Subtitle>flex-col</Subtitle>
          <div className="flex flex-col">{boxes}</div>
        </Div>
        <Div className="mr-2">
          <Subtitle>flew-col-reverse</Subtitle>
          <div className="flex flew-col-reverse p-4">{boxes}</div>
        </Div>
      </Div>
    </section>
  );
}
