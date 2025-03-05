/* eslint-disable @typescript-eslint/no-explicit-any */
export function mockFetch(data: any, headers: any = null) {
  if (!headers) {
    headers = { "Content-Type": "application/json" }
  }
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
      headers: new Headers(headers),
      text: () => Promise.resolve(JSON.stringify(data)),
    }),
  )
}
