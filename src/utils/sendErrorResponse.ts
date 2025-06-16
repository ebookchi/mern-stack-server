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
  //   return response;
  // This function sends a standardized error response with a message and status code.
  // It can be used throughout the application to maintain consistency in error handling.
  // The response object is expected to be an instance of Express's Response class.
  // Example usage:
  // sendErrorResponse({
  //   response: res,
  //   message: "An error occurred",
  //   status: 500
  // });
  // This will send a JSON response with the error message and status code.
  // The response will have the following structure:
  // {
  //   "error": "An error occurred"
  // }
  // The status code will be set to the provided status value (e.g., 500).
  // This function can be used in any part of the application where an error response needs to be sent,
  // ensuring that all error responses follow a consistent format.
  // It is particularly useful in API development where standardized error responses are crucial for client-side error handling.
};
