import type { FC } from "react";
import type { DivProps } from "../components";
import { Div } from "../components";
import * as D from "../data";
import User from "./User";

export type CardProps = DivProps & {
  card: D.ICard;
};
const Card: FC<CardProps> = ({ card, ...props }) => {
  const { writer, image, title, paragraphs, dayMonthYearDate, relativeDate } =
    card;
  const icons = ["home", "search", "settings", "favorie"].map((name) => (
    <Icon key={name} name={name} className="mr-2 text-3xl" />
  ));
  return (
    <Div {...props}>
      <div className="flex flex-col">
        <Div src={image} className="h-60" />
        <Div className="p-4" minHeight="16rem" height="16rem" maxHeight="16rem">
          <p className="mt-2 text-3xl text-center text-bold">{title}</p>
        </Div>
        <User user={writer} className="mt-2" />
      </div>
    </Div>
  );
};

export default Card;
