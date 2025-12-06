import type { AxiosError } from "axios";

export type TPagination = {
  current: number;
  pageSize: number;
  total?: number;
};

export type ApiErrorResponse = {
  message: string;
};

export type ApiError = AxiosError<ApiErrorResponse>;
