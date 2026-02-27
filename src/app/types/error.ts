export type TErrorSource = {
  path: string;
  message: string;
};
export type TGenericError = {
  statusCode: number;
  message: string;
  errorSource: TErrorSource[];
};
