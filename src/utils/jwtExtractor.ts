import type { Request, Response as Rez } from 'express';
import HttpStatus from './http.js';
import Response from './response.js';

export default function (req: Request, res: Rez) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const message = 'Unauthenticated';
    const status_code = HttpStatus.BAD_REQUEST.code;
    const http_status = HttpStatus.BAD_REQUEST.status;
    const validationError = new Response(status_code, http_status, message, {});
    return res.status(validationError.statusCode).send(validationError);
  }

  return authHeader.split(' ')[1];
}
