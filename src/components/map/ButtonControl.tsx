import Image from "next/image";
import Control from "react-leaflet-custom-control";

type Props = {
  classNames?: string;
  icon: string;
  title: string;
  onClick?: () => void;
} & React.ComponentProps<typeof Control>;

const ButtonControl = ({ title, position, icon, onClick }: Props) => {
  return (
    <Control position={position} container={{ className: "leaflet-bar" }}>
      <a onClick={onClick}>
        <Image alt={title} src={icon} width="32" height="32" />
      </a>
    </Control>
  );
};

export default ButtonControl;
