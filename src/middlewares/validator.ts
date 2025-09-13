import { RequestHandler } from "express";
import { z, ZodType } from "zod";
import { required } from "zod/v4-mini";

export const emailValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    })
    .min(10, "Minimum length is 10 characters"),
});

export const newUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Invalid Name format",
    })
    .min(3, "Minimum length is 3 characters")
    .trim(),
});

export const newAuthorSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Invalid Pen name format",
    })
    .min(3, "Minimum length is 3 characters")
    .trim(),
  about: z
    .string({
      required_error: "Bio is required",
      invalid_type_error: "Invalid Bio format",
    })
    .min(10, "Minimum length is 10 characters")
    .trim(),
  socialLinks: z
    .array(z.string().url("Social links can only be list of valid URLs!"))
    .optional(),
});

export const validate = <T extends unknown>(
  schema: ZodType<T>
): RequestHandler => {
  return (req, res, next): void => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      next();
    } else {
      const error = result.error.flatten().fieldErrors;
      res.status(400).json(error);
    }
  };
};
