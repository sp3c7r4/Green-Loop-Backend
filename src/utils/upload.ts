import path from 'path';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import CustomError from './error';
import HttpStatus from './http';
import type { NextFunction, Request, Response } from 'express';
import env from '../config/env';

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const upload = multer({
  dest: path.join(process.cwd(), '../../uploads'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: Request, file, cb) => {
    if(file) {
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        return cb(
          new CustomError(
            'Only image files are allowed!',
            HttpStatus.BAD_REQUEST.code,
            HttpStatus.BAD_REQUEST.status
          )
        );
      }
      req.file = file
      cb(null, true);
    } else {
      cb(null, true)
    }
  },
});

// Error-handling middleware for multer
export function multerErrorHandler(err: object, req: Request, res: Response, next: NextFunction) {
  if (err instanceof CustomError) {
    // Handle custom errors
    return res.status(err.status_code).send({ message: err.message });
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    // Handle file size limit errors
    return res.status(HttpStatus.BAD_REQUEST.code).send({
      message: 'File size exceeds the 5MB limit!',
    });
  }
  next(err);
}
export async function uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("req.file?.path", req.file?.path)
        const file = req.file?.path; // Assuming multer adds the file to req
        if (!file) {
          return next()
            // return res.status(HttpStatus.BAD_REQUEST.code).send({ message: 'No file uploaded!' });
        }
        const uploadResult = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: "greensync",
        });
        console.log(uploadResult)
        req.body.image_url = uploadResult.secure_url
        next()
    } catch (error) {
      console.log(error)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({ message: 'Upload failed!', error });
    }
}