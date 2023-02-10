import { useState, useEffect, Dispatch, SetStateAction } from "react";

function getStorageValue<S>(key: string, defaultValue: S): S {
  // getting stored value
  const saved = localStorage.getItem(key);
  if (!saved) {
    return defaultValue;
  }
  //try parse localStorage if throw any err return default value
  try {
    return JSON.parse(saved);
  } catch (error) {
    return defaultValue;
  }
}

/**
 * uselocal storage hook
 * use like useState save state to localStorage
 * @param key store key
 * @param defaultValue if not exist value return default
 */
export function useLocalStorage<S>(
  key: string,
  defaultValue: S
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(getStorageValue(key, defaultValue));
  }, []);

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
