import L from "leaflet";
import React, { useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  position: L.ControlPosition;
  children?: React.ReactNode;
  container?: React.HTMLAttributes<HTMLDivElement>;
}

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

export const Control = ({ children, position, container }: Props) => {
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  const [containerEl] = useState(() => {
    const targetDiv = document.getElementsByClassName(positionClass);
    return targetDiv[0];
  });

  const className =
    (container?.className?.concat(" ") || "") + "leaflet-control";
  return createPortal(
    <div {...container} className={className}>
      {children}
    </div>,
    containerEl
  );
};
