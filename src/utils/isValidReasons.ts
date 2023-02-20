export const isValidReasons = (
  reasons: string | undefined
): reasons is string => {
  return reasons === "" || !!reasons;
};
