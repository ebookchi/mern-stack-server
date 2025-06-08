import { RequestHandler } from "express";
import { z, ZodRawShape } from "zod/v4";

/**
 * Email validation schema using Zod
 * Enforces email format and minimum length requirements
 *
 * @constant {Object}
 * @property {z.ZodString} email - Email validator with custom error messages
 */
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

/**
 * Generic request body validator middleware factory
 * Creates an Express middleware that validates request body against a Zod schema
 *
 * @template T extends ZodRawShape
 * @param {T} obj - Zod schema object to validate against
 * @returns {RequestHandler} Express middleware that validates request body
 *
 * @example
 * // Usage with email schema
 * router.post('/route', validate(emailValidationSchema), handler);
 *
 * @throws {400} If validation fails, returns 400 with validation errors
 */
export const validate = <T extends ZodRawShape>(obj: T): RequestHandler => {
  return async (req, res, next): Promise<void> => {
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
