export type ApiResponse<T> = {
  success: false;
  payload?: {
    message: string;
  }
} | {
  success: true;
  payload: T
}