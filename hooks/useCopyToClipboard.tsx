import React from "react";

const useCopyToClipboard = (text) => {
	const copyToClipboard = (str) => {
		const el = document.createElement("textarea");
		el.value = str;
		el.setAttribute("readonly", "");
		el.style.position = "absolute";
		el.style.left = "-9999px";
		document.body.appendChild(el);
		const selected =
			document.getSelection().rangeCount > 0
				? document.getSelection().getRangeAt(0)
				: false;
		el.select();
		const success = document.execCommand("copy");
		document.body.removeChild(el);
		if (selected) {
			document.getSelection().removeAllRanges();
			document.getSelection().addRange(selected);
		}
		return success;
	};
	const [copied, setCopied] = React.useState(false);
	const copy = React.useCallback(() => {
		if (!copied) setCopied(copyToClipboard(text));
	}, [text]);
	React.useEffect(() => () => setCopied(false), [text]);
	return [copied, copy];
};
