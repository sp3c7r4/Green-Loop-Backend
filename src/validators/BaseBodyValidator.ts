import { body, validationResult } from 'express-validator';
import HttpStatus from '../utils/http';
import Response from '../utils/response';
import type { NextFunction, Request, Response as Responze } from 'express';

export default function BaseBodyValidator(fields: string[]) {
  return [
    ...fields.map((field: string) =>
      body(field)
        .trim()
        .notEmpty()
        .withMessage(`${field} cannot be empty`)
        .custom((value) => {
          if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
            throw new Error('Invalid email');
          }
          return true;
        }),
    ),
    (req: Request, res: Responze, next: NextFunction) => {
      
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        next();
      } else {
        const message = errors.array()[0]?.msg;
        const status_code = HttpStatus.BAD_REQUEST.code;
        const http_status = HttpStatus.BAD_REQUEST.status;
        const validationError = new Response(status_code, http_status, message, {
          errors: errors.array(),
        });
        res.status(validationError.statusCode).send(validationError);
      }
    },
  ];
}