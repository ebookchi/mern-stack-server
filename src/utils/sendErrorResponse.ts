import { Response } from "express";

type ErrorResponseType = {
  response: Response;
  message: string;
  status: number;
};

export const sendErrorResponse = ({
  response,
  message,
  status,
}: ErrorResponseType) => {
  console.error(`Error: ${message} (Status: ${status})`);
  response.status(status).json({
    error: message,
  });
};
