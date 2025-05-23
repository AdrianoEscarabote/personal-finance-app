/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/validateParams.ts
export function validateParams(
  params: Record<string, any>,
  requiredParams: string[],
) {
  const missingParams = requiredParams.filter(
    (key) =>
      params[key] === undefined || params[key] === null || params[key] === "",
  )

  if (missingParams.length > 0) {
    throw new Error(`Missing param(s): ${missingParams.join(", ")}`)
  }
}
