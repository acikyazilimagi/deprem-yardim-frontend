const isNaN = (value: any) => {
  return !!value && value.toLowerCase() === "nan";
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export { capitalize, isNaN };
