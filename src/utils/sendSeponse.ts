/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { TMeta } from '../types/meta';

type TData = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
  meta?: TMeta;
};

const sendResponse = (res: Response, data: TData) => {
  res.status(data.statusCode).json({
    success: data?.success,
    message: data?.message,
    meta: data?.meta,
    data: data?.data,
  });
};

export default sendResponse;
