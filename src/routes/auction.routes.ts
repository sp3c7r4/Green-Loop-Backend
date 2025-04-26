import express, { type Request, type Response } from 'express'
import tryCatch from '../utils/tryCatch';
import BaseBodyValidator from '../validators/BaseBodyValidator';
import { userAuthHandler } from '../middlewares/userAuthHandler';
import { createAuction } from '../controllers/auction.controller';
// import UpdateBodyValidator from '../validators/UpdateBodyValidator';
// import BaseParamValidator from '../validators/BaseParamValidator';

const router = express.Router()

const auctionFields = ['price','productId']

router.post('/create',
  userAuthHandler,
  BaseBodyValidator(auctionFields),
  tryCatch(async (req: Request, res: Response) => {
    const create = await createAuction({...req.body, userId: req.id})
    res.status(create.statusCode).send(create);
}));

// router.post('/update',
//   userAuthHandler,
//   upload.single('image'),
//   multerErrorHandler,
//   uploadImage,
//   UpdateBodyValidator(productFields),
//   tryCatch(async (req: Request, res: Response) => {
//     const register = await updateProduct({...req.body, userId: req.id})
//     res.status(register.statusCode).send(register);
// }));

// router.get('/read/all',
//   userAuthHandler,
//   tryCatch(async (req: Request, res: Response) => {
//   const read = await readAllProductsById(req.id)
//   res.status(read.statusCode).send(read);
// }));

// router.get('/read/all-products',
//   tryCatch(async (req: Request, res: Response) => {
//   const read = await readAllProducts()
//   res.status(read.statusCode).send(read);
// }));

// router.get('/read/:id',
//   BaseParamValidator(['id']),
//   tryCatch(async (req: Request, res: Response) => {
//   const read = await readProductById(req.params.id)
//   res.status(read.statusCode).send(read);
// }));

// router.delete('/delete/:id',
//   BaseParamValidator(['id']),
//   tryCatch(async (req: Request, res: Response) => {
//   const destroy = await deleteProductById(req.params.id)
//   res.status(destroy.statusCode).send(destroy);
// }));
export default router;