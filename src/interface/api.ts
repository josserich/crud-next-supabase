// src/interface/Error.ts
export interface APIErrorResponse {
  authorization?: string;
  errors?: {
    [key: string]: string;
  };
}

export interface AxiosError<T = unknown> extends Error {
  response?: {
    data?: T;
    status: number;
    statusText: string;
  };
}
