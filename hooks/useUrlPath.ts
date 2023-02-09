import { NextRouter } from "next/router";
import { useCallback } from "react";

export function useUrlPath() {
  const setUrlQuery = useCallback((key: Object, router: NextRouter) => {
    const queries = router.query;
    const modifiedQuery = { ...queries, ...key };

    const modifiedArray = Object.entries(modifiedQuery);
    modifiedArray.forEach((entry, index) => {
      if (entry[1] === undefined) {
        modifiedArray.splice(index, 1);
      }
    });

    const toPath = modifiedArray.map((item) => item.join("=")).join("&");
    return toPath;
  }, []);

  return {
    setUrlQuery,
  };
}
