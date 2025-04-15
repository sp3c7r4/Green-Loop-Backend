import HttpStatus from "./http";

class Response {
  timeStamp: string;
  statusCode: number;
  httpStatus: string;
  message: string;
  data: string | object;
  
  constructor(statusCode: number, httpStatus: string, message: string, data: string | object) {
    this.timeStamp = new Date().toLocaleString();
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}

export function BAD_REQUEST(message: string) {
  return new Response(
    HttpStatus.BAD_REQUEST.code,
    HttpStatus.BAD_REQUEST.status,
    message,
    {}
  )
} 

export default Response;
