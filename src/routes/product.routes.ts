import express, { type Request, type Response } from 'express'
import tryCatch from '../utils/tryCatch';
import BaseBodyValidator from '../validators/BaseBodyValidator';
import { createProduct, updateProduct } from '../controllers/product.controller';
import { userAuthHandler } from '../middlewares/userAuthHandler';
import { upload, multerErrorHandler, uploadImage } from '../utils/upload';
import UpdateBodyValidator from '../validators/UpdateBodyValidator';

const router = express.Router()

const productFields = ['name','image_url', 'about', 'brand', 'issue', 'address'];
const productUpdateFields = ['name','image_url', 'about', 'brand', 'issue', 'address'];

router.post('/create',
  userAuthHandler,
  upload.single('image'),
  multerErrorHandler,
  uploadImage,
  BaseBodyValidator(productFields),
  tryCatch(async (req: Request, res: Response) => {
    console.log(req)
    const register = await createProduct({...req.body, userId: req.id})
    res.status(register.statusCode).send(register);
}));

router.post('/update',
  userAuthHandler,
  upload.single('image'),
  multerErrorHandler,
  uploadImage,
  UpdateBodyValidator(productUpdateFields),
  tryCatch(async (req: Request, res: Response) => {
    const register = await updateProduct({...req.body, userId: req.id})
    res.status(register.statusCode).send(register);
}));

export default router;