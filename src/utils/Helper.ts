export const isNull = (x: unknown): x is null | undefined => {
  return x === null || x === undefined;
};

export const isObject = (x: unknown): x is object => {
  return !isNull(x) && typeof x === "object";
};
