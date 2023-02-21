const isNaN = (value: unknown) =>
  typeof value === "string" && value.toLowerCase() === "nan";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export { capitalize, isNaN };
