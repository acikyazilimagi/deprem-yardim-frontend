import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored).data : defaultValue);
  }, [defaultValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ data: value }));
  }, [key, value]);

  return [value, setValue] as const;
}
