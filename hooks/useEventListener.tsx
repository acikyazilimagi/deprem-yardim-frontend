import React from "react";

const useEventListener = (type, handler, el = window) => {
	const savedHandler = React.useRef();
	React.useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);
	React.useEffect(() => {
		const listener = (e) => savedHandler.current(e);
		el.addEventListener(type, listener);
		return () => {
			el.removeEventListener(type, listener);
		};
	}, [type, el]);
};
