import React from "react";

const useFetch = (url, options) => {
	const [response, setResponse] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [abort, setAbort] = React.useState(() => {});
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const abortController = new AbortController();
				const signal = abortController.signal;
				setAbort(abortController.abort);
				const res = await fetch(url, { ...options, signal });
				const json = await res.json();
				setResponse(json);
			} catch (error) {
				setError(error);
			}
		};
		fetchData();
		return () => {
			abort();
		};
	}, []);
	return { response, error, abort };
};
