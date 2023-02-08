import { useCallback, useEffect, useRef, useState } from "react";

type CallbackType = () => Promise<unknown> | unknown;

export default function useIncrementalThrottling(
  cb: CallbackType,
  initialSec: number
): [number, () => void] {
  const [remainingSec, setRemainingSec] = useState(initialSec);
  const waitingTimeSec = useRef(initialSec);

  const reset = useCallback(() => {
    waitingTimeSec.current = initialSec;
    setRemainingSec(initialSec);
  }, [initialSec]);

  useEffect(() => {
    if (remainingSec === 0) {
      cb();
      waitingTimeSec.current *= waitingTimeSec.current;
      setRemainingSec(waitingTimeSec.current);
      return;
    }

    const timer = setTimeout(async () => {
      setRemainingSec(remainingSec - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [remainingSec, cb]);

  return [remainingSec, reset];
}
