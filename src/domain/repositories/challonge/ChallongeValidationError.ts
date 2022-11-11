export type ChallongeValidationError = {
  errors: string[];
};

export function isChallongeValidationError(
  x: unknown
): x is ChallongeValidationError {
  return typeof x === "object" && x !== null && Object.hasOwn(x, "errors");
}
