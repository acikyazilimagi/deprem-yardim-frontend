import Image from "next/image";
import Control from "react-leaflet-custom-control";
import cn from "classnames";

type Props = {
  classNames?: string;
  icon?: string;
  title: string;
  onClick?: () => void;
} & React.ComponentProps<typeof Control>;

const ButtonControl = ({
  classNames,
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
        {icon ? <Image alt={title} src={icon} width="32" height="32" /> : title}
      </a>
    </Control>
  );
};

export default ButtonControl;
