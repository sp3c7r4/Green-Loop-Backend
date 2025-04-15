import type { Request } from 'express';
import CustomError from './error.js';
import HttpStatus from './http.js';
import Response from './response.js';

export default function (req: Request) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const message = 'Unauthenticated';
    const status_code = HttpStatus.BAD_REQUEST.code;
    const http_status = HttpStatus.BAD_REQUEST.status;
    const validationError = new Response(status_code, http_status, message, {});
    throw new CustomError(validationError.message, status_code, http_status);
  }

  return authHeader.split(' ')[1];
}
