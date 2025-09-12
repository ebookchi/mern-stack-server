import { Router } from "express";
import {
  logout,
  sendProfileInformation,
  updateProfile,
} from "@/controllers/auth";
import { generateAuthLink, verifyAuthToken } from "@/controllers/auth";
import {
  emailValidationSchema,
  newUserSchema,
  validate,
} from "@/middlewares/validator";
import { isAuth } from "@/middlewares/auth";
import { fileParser } from "@/middlewares/file";

const authRouter = Router();

authRouter.post(
  "/generate-link",
  validate(emailValidationSchema),
  generateAuthLink
);

authRouter.get("/verify", verifyAuthToken);
authRouter.get("/profile", isAuth, sendProfileInformation);
authRouter.post("/logout", isAuth, logout);
authRouter.put(
  "/profile",
  isAuth,
  fileParser,
  validate(newUserSchema),
  updateProfile
);

export default authRouter;
