import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

const Map = (props: any) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
