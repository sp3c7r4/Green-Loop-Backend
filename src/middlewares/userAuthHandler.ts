import type { NextFunction, Request, Response as Rez } from "express";
import HttpStatus from "../utils/http";
import JWT from "../utils/jwtClass";
import jwtExtractor from "../utils/jwtExtractor";
import Response from "../utils/response";

export function userAuthHandler(req: Request, res: Rez, next: NextFunction) {
  
  const token = jwtExtractor(req)
  const verifiedToken = JWT.verifyToken(token);
  if (
    verifiedToken === 'Invalid Token' ||
    verifiedToken.user_type !== 'user'
  ) {
    const message = 'Unauthorized';
    const status_code = HttpStatus.BAD_REQUEST.code;
    const http_status = HttpStatus.BAD_REQUEST.status;
    const validationError = new Response(status_code, http_status, message, {});
    return res.status(validationError.statusCode).send(validationError);
  }
  req.id = verifiedToken?.user.id;
  next();
};
