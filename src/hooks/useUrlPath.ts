import { NextRouter } from "next/router";
import { useCallback } from "react";

export function useUrlPath() {
  const setUrlQuery = useCallback((key: Object, router: NextRouter) => {
    const queries = router.query;
    const modifiedQuery = { ...queries, ...key };
    const query = new URLSearchParams();
    const modifiedArray = Object.entries(modifiedQuery);
    modifiedArray.forEach((entry) => {
      if (entry[0] && entry[1]) {
        query.append(entry[0], entry[1].toString());
      }
    });

    return query.toString();
  }, []);

  return {
    setUrlQuery,
  };
}
