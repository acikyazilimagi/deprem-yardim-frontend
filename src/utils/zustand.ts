import queryString from "query-string";
import { StateStorage } from "zustand/middleware";

export const getHashStorage = (): StateStorage => ({
  getItem: (key) => {
    const query = queryString.parse(location.hash, { arrayFormat: "comma" });
    return query[key] as any;
  },
  setItem: (key, newValue) => {
    const query = queryString.parse(location.hash, { arrayFormat: "comma" });
    query[key] = newValue;
    location.hash = queryString.stringify(query, { arrayFormat: "comma" });
  },
  removeItem: (key) => {
    const query = queryString.parse(location.hash, { arrayFormat: "comma" });
    delete query[key];
    location.hash = queryString.stringify(query, { arrayFormat: "comma" });
  },
});
