export type Response<T> =
  | {
      success: true;
      message?: string;
      data: T;
    }
  | {
      success: false;
      message?: string;
      errors: string[];
    };
