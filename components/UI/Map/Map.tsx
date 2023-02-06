import dynamic from "next/dynamic";
import { ReactNode } from "react";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

interface MapProps {
  center: number[];

  zoom: number;

  children: ReactNode;
}

const Map = (props: MapProps) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
