import express, { type Request, type Response } from 'express'
import { loginUser, registerUser, updateUser } from '../controllers/user.controller';
import tryCatch from '../utils/tryCatch';
import BaseBodyValidator from '../validators/BaseBodyValidator';
import UpdateBodyValidator from '../validators/UpdateBodyValidator';
import { userAuthHandler } from '../middlewares/userAuthHandler';

const router = express.Router()

const registerFields = ['firstname','lastname','email','mobile','type', 'password', 'address', 'state', 'lga'];
const updateFields = ['firstname','lastname','email','mobile', 'password' ];
const loginFields = [ 'email','password' ];

router.post('/register',
  BaseBodyValidator(registerFields),
  tryCatch(async (req: Request, res: Response) => {
  const register = await registerUser(req.body)
  console.log(register)
  res.status(register.statusCode).send(register);
}));

router.post('/login',
  BaseBodyValidator(loginFields),
  tryCatch(async (req: Request, res: Response) => {
  const login = await loginUser(req.body.email, req.body.password)
  res.status(login.statusCode).send(login);
}));

router.post('/update',
  userAuthHandler,
  tryCatch(async (req: Request, res: Response) => {
  const login = await updateUser(req.id, req.body)
  res.status(login.statusCode).send(login);
}));
export default router;