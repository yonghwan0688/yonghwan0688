import type { FC } from "react";
import type { ButtonProps } from "./Button";
import type { IconProps as CIconProps } from "../../components";
import { Button } from "./Button";
import { Icon as CIcon } from "../../components";

export type IconProps = ButtonProps &
  CIconProps & {
    iconClassName?: string;
  };

export const Icon: FC<IconProps> = ({
  name,
  iconClassName = "",
  className = "",
  style,
  ...buttonProps
}) => {
  const btnClassName = ["btn", "btn-circle", className]
    .filter(Boolean)
    .join(" ");
  return (
    <Button {...buttonProps} className={btnClassName}>
      <CIcon className={iconClassName} name={name} style={style} />
    </Button>
  );
};
