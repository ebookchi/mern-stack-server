import { formatUserProfile } from "./../utils/helper";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import { RequestHandler } from "express";
import crypto from "crypto";
import VerificationTokenModel from "@/models/verificationToken";
import userModel from "@/models/user";
import { generateVerificationEmail } from "@/templates/emails/verificationEmail";
import mail from "@/utils/mail";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const generateAuthLink: RequestHandler = async (request, response) => {
  //generate authentication link
  //and send it to the user's email using Mailtrap service
  /*
    1. Generate a unique token for the user
    2. Store the token in the database with an expiration time
    3. Create a magic link using the token
    4. Send the magic link to the user's email address
    5. Notify the user that the link has been sent
    6. Retu rn a success response
    */

  const token = crypto.randomBytes(36).toString("hex");
  const expirationTime = Date.now() + 3600000; // 1 hour from now

  const { email } = request.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    //create user if not exists
    user = await userModel.create({ email });
  }
  const userId = user._id.toString();

  // Check if a verification token already exists for the user, and delete it
  // to ensure only one active token per user at a time
  await VerificationTokenModel.findOneAndDelete({
    userId,
  });

  // Create a new verification token for the user
  await VerificationTokenModel.create({
    token,
    userId, // Assuming userId is the email for simplicity
    expiresAt: new Date(expirationTime),
  });

  let link = `${process.env.APP_URI}:${process.env.PORT}/auth/verify?token=${token}&userId=${userId}`;

  // Ensure APP_URI and PORT are defined before using includes to avoid runtime errors,
  // This is to ensure that the link is correctly formatted for github codespaces
  if (
    typeof process.env.APP_URI === "string" &&
    typeof process.env.PORT === "string" &&
    process.env.APP_URI.includes(process.env.PORT)
  ) {
    link = `${process.env.APP_URI}/auth/verify?token=${token}&userId=${userId}`;
  }

  await mail.sendVerificationEmail({
    to: email,
    content: generateVerificationEmail(link),
  });

  response
    .status(200)
    .json({ message: "Authentication link generated successfully" });
};

export const verifyAuthToken: RequestHandler = async (request, response) => {
  const { token, userId } = request.query;

  // Validate query parameters
  if (typeof token !== "string" || typeof userId !== "string") {
    sendErrorResponse({
      response,
      message: "Invalid request parameters. Token and userId must be strings.",
      status: StatusCodes.FORBIDDEN,
    });
    return;
  }

  if (!token || !userId) {
    response
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Invalid request parameters" });
    return;
  }

  // Find the verification token for the user
  const verificationTokenModel = await VerificationTokenModel.findOne({
    userId,
  });

  // Check if token exists and matches
  if (
    !verificationTokenModel ||
    typeof verificationTokenModel.compareToken !== "function" ||
    !verificationTokenModel.compareToken(token)
  ) {
    sendErrorResponse({
      response,
      message:
        "Invalid or expired token. Please request a new authentication link.",
      status: StatusCodes.FORBIDDEN,
    });
    return;
  }

  // Check token expiration
  if (verificationTokenModel.expiresAt < new Date()) {
    sendErrorResponse({
      response,
      message: "Token has expired. Please request a new authentication link.",
      status: StatusCodes.FORBIDDEN,
    });
    return;
  }

  // Find the user by userId
  const user = await userModel.findById(userId);
  if (!user) {
    sendErrorResponse({
      response,
      message: "User not found",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
    return;
  }

  // Delete the used token to prevent reuse
  await VerificationTokenModel.deleteOne({ _id: verificationTokenModel._id });

  // Issue JWT for authenticated session
  const payload = { userId: user._id.toString() };
  const authToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  response.cookie("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  });

  response.redirect(`${process.env.AUTH_SUCCESS_URL}`);
};

export const sendProfileInformation: RequestHandler = (request, response) => {
  // This endpoint is used to send the user's profile information
  // It is protected by the isAuth middleware to ensure only authenticated users can access it
  const user = request.user; // Assuming user is set by the isAuth middleware
  if (!user) {
    return sendErrorResponse({
      response,
      message: "User not authenticated",
      status: StatusCodes.UNAUTHORIZED,
    });
  }

  response.status(StatusCodes.OK).json({
    profile: formatUserProfile(user),
    message: "Profile information retrieved successfully",
  });
};

export const logout: RequestHandler = (request, response) => {
  response.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    expires: new Date(0), // Set expiration to the past to clear the cookie
  });
  response.redirect(process.env.AUTH_LOGOUT_URL || "/");
  response.status(StatusCodes.OK).json({
    message: "Logout successful",
  });
  response.end();
};
