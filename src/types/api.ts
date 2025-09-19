/**
 * Standard API response wrapper
 * Works great with useAxios hook and Tanstack Query
 */
export type ApiResponse<TData = unknown, TError = unknown>
  = | ApiSuccessResponse<TData>
    | ApiErrorResponse<TError>;

export type ApiSuccessResponse<TData> = {
  readonly success: true;
  readonly data: TData;
  readonly message?: string;
};

export type ApiErrorResponse<TError = unknown> = {
  readonly success: false;
  readonly error: TError;
  readonly message: string;
  readonly data?: never;
};

/**
 * Common API error format
 */
export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
};
