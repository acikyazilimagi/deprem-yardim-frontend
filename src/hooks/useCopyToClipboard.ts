import { useState } from "react";

type CopiedValue = string;

type CopyFn = (_text: string) => Promise<boolean>; // Return success

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<CopiedValue>("");

  const copyToClipBoard: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText("");
      return false;
    }
  };

  return {
    copiedText,
    copyToClipBoard,
  };
};
