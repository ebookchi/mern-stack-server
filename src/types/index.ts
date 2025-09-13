import { newAuthorSchema } from "@/middlewares/validator";
import { RequestHandler } from "express";
import { z } from "zod";

type authorHandlerBody = z.infer<typeof newAuthorSchema>;
export type AuthorRequestHandler = RequestHandler<
  unknown,
  unknown,
  authorHandlerBody
>;
