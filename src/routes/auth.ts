import { Router } from "express";
import { logout, sendProfileInformation } from "@/controllers/auth";
import { generateAuthLink, verifyAuthToken } from "@/controllers/auth";
import { emailValidationSchema, validate } from "@/middlewares/validator";
import { isAuth } from "@/middlewares/auth";

const authRouter = Router();

authRouter.post(
  "/generate-link",
  validate(emailValidationSchema),
  generateAuthLink
);

authRouter.get("/verify", verifyAuthToken);
authRouter.get("/profile", isAuth, sendProfileInformation);
authRouter.post("/logout", isAuth, logout);

export default authRouter;
