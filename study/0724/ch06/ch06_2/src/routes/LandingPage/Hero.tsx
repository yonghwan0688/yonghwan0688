import { Link } from "react-router-dom";
import { Div } from ".../../components";
import { Button } from ".../../components";
import * as D from ".../../data";

export default function Hero() {
  return (
    <div className="flex items-center p-4">
      <Div minWidth="300px" width="30rem" maxWidth="30rem">
        <div className="flex flex-col items-center justify-center h-full">
          <p>{D.randomSentence(20)}</p>
          <div>
            <Link to="/board" className="mt-4">
              <Button>go to board</Button>
            </Link>
          </div>
        </div>
      </Div>
      <Div
        src={D.randomImageUrl(300, 300)}
        className="w-full ml-4"
        minHeight="20rem"
        height="20rem"
      />
    </div>
  );
}
