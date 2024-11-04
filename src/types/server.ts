export type ServerActionResponse<T> = {
  error?: string;
  data: T;
};
