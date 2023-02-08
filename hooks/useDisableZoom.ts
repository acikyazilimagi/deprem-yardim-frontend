import { useEffect } from "react";

function useDisableZoom() {
  useEffect(() => {
    const onWheelTrigger = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const onTouchMove = (e: any) => {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheelTrigger, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheelTrigger);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);
}

export default useDisableZoom;
