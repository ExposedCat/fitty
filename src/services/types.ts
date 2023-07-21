export type ErrorResponse<E> = { success: false; error: E };
export type DataResponse<D> = { success: true; data: D };
export type SimpleResponse = { success: boolean };
export type ServiceResponse<D = void, E = void> =
  | ErrorResponse<E>
  | DataResponse<D>;
