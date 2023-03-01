import Image from "next/image";
import { Control } from "./Control";
import cn from "classnames";

type Props = {
  classNames?: string;
  icon?: string;
  title: string;
  onClick?: () => void;
} & React.ComponentProps<typeof Control>;

export const ButtonControl = ({
  classNames,
  children,
  title,
  position,
  icon,
  onClick,
}: Props) => {
  return (
    <Control
      position={position}
      container={{ className: cn("leaflet-bar", classNames) }}
    >
      <a onClick={onClick}>
        {!!icon && <Image alt={title} src={icon} width="32" height="32" />}
        {!icon && !children && title}
        {children}
      </a>
    </Control>
  );
};
