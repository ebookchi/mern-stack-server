import { RequestHandler } from "express";
import { z, ZodRawShape } from "zod/v4";

export const emailValidationSchema = {
  email: z
    .email({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Invalid email format",
    })
    .min(10, "Minimum length is 10 characters"),
};

export const validate = <T extends ZodRawShape>(obj: T): RequestHandler => {
  return (req, res, next): void => {
    const schema = z.object(obj);
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      next();
    } else {
      const error = z.flattenError(result.error).fieldErrors;
      res.status(400).json(error);
    }
  };
};
