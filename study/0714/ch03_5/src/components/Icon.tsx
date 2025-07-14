import type { FC } from "react";

export type IconProps = {
  name: string;
  className?: string;
  style?: React.CSSProperties;
};

export const Icon: FC<IconProps> = ({ name, className = "", style = {} }) => {
  return (
    <span className={`material-icons ${className}`} style={style}>
      {name}
    </span>
  );
};
