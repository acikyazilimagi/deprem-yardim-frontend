import React from "react";

const useOnWindowResize = (callback) => {
	const listener = React.useRef(null);
	React.useEffect(() => {
		if (listener.current)
			window.removeEventListener("resize", listener.current);
		listener.current = window.addEventListener("resize", callback);
		return () => {
			window.removeEventListener("resize", listener.current);
		};
	}, [callback]);
};
