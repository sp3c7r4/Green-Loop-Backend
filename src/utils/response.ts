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

export function CREATED(message: string, data: any) {
  return new Response(
    HttpStatus.CREATED.code,
    HttpStatus.CREATED.status,
    message,
    data
  );
}

export function OK(message: string, data: any) {
  return new Response(HttpStatus.OK.code, HttpStatus.OK.status, message, data);
}

export default Response;
