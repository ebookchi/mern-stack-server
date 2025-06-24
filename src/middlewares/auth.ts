import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userModel, { UserDocument } from "@/models/user";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import { StatusCodes } from "http-status-codes";

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument;
    }
  }
}

export const isAuth: RequestHandler = async (req, res, next) => {
  const authToken = req.cookies.authToken;
  // Check if the authentication token is present in the request cookies
  if (!authToken) {
    return sendErrorResponse({
      response: res,
      message: "Authentication token is missing",
      status: StatusCodes.UNAUTHORIZED,
    });
  }

  // Verify the token using the secret key
  const decoded = jwt.verify(authToken, process.env.JWT_SECRET! as string) as {
    userId: string;
  };
  // Find the user by ID from the decoded token
  const user = await userModel.findById(decoded.userId);
  // If user is not found, send an error response
  if (!user) {
    return sendErrorResponse({
      response: res,
      message: "User not found",
      status: StatusCodes.NOT_FOUND,
    });
  }
  // Attach the user to the request object for further use in the application
  req.user = user;
  // Call the next middleware or route handler
  next();
};
