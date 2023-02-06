import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

const Map = (props: any) => {
  return (
    <div style={{ width: "100vw", height: "calc(100vh - 36.5px)" }}>
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
