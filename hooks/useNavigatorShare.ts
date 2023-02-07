import { useState, useEffect } from "react";

type ShareableObject = {
  text: string;
  title?: string;
  url?: string;
};

// Navigator Share Hook
export function useNavigatorShare() {
  // State and setter for browser support
  const [canShare, setCanShare] = useState<boolean>(false);

  // Browser support checker
  const checkCanShare = (): boolean => {
    try {
      const shareTestData = {
        text: "Dummy Share test",
        link: "https://www.google.com/maps/@37.0097206,37.792836,22z",
      };

      return navigator.canShare(shareTestData);
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    setCanShare(checkCanShare());
    return () => {
      setCanShare(false);
    };
  }, []);

  const share = (shareData: ShareableObject) => {
    try {
      navigator
        .share(shareData)
        .catch((error) => console.log("Error sharing", error));
    } catch (err) {
      alert(
        "Tarayıcınız bu özelliği desteklemiyor. Lütfen adresi kopyalayarak paylaşın."
      );
    }
  };

  return [canShare, share] as const;
}
