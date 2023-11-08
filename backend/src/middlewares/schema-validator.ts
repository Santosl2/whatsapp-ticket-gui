import SchemaValidationError from "errors/schema-validator-error";
import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

export function schemaValidatorMiddleware<T extends ZodRawShape>(
  schema: ZodObject<T>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (parsed.body) {
        req.body = parsed.body;
      }

      if (parsed.query) {
        req.query = parsed.query;
      }

      if (parsed.params) {
        req.params = parsed.params;
      }

      return next();
    } catch {
      throw new SchemaValidationError("Invalid data");
    }
  };
}
