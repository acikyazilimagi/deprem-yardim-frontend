import { useEffect, useState } from "react";

function useDevice() {
  const [windowSize, setWindowSize] = useState<any>({
    width: null,
    height: null,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize > 768 ? "desktop" : "mobile";
}

export { useDevice };
