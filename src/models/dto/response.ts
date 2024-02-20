export class Response<T> {
  constructor(public success: boolean, public content: T | null) {}
}

export function createResponse<T>(success: boolean, content: T | null) {
  return new Response<T>(success, content)
}
