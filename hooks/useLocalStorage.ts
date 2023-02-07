interface HookProps {
  key: string;
  initialValue: any;
}

export function useLocalStorage({ key, initialValue }: HookProps) {
  const getLocalValue = () => localStorage.getItem(key) || initialValue;

  const setLocalValue = (newValue: any) =>
    localStorage.setItem(key, JSON.stringify(newValue));

  return {
    setLocalValue,
    getLocalValue,
  };
}
