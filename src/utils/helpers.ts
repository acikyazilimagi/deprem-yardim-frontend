const isNaN = (value: unknown) =>
  typeof value === "string" && value.toLowerCase() === "nan";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const shallowEqual = (obj1: object, obj2: object) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (
      (obj1 as { [key: string]: Object })[key] !==
      (obj2 as { [key: string]: Object })[key]
    ) {
      return false;
    }
  }
  return true;
};

export { capitalize, isNaN, shallowEqual };
