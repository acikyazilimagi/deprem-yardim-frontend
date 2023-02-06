import React from "react";

const useOnWindowScroll = (callback) => {
	const listener = React.useRef(null);
	React.useEffect(() => {
		if (listener.current)
			window.removeEventListener("scroll", listener.current);
		listener.current = window.addEventListener("scroll", callback);
		return () => {
			window.removeEventListener("scroll", listener.current);
		};
	}, [callback]);
};
