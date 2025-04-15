import express, { type Request, type Response } from 'express'
import { loginUser, registerUser } from '../controllers/user.controller';
import tryCatch from '../utils/tryCatch';
import BaseBodyValidator from '../validators/BaseBodyValidator';

const router = express.Router()

const registerFields = ['firstname','lastname','email','mobile','type', 'password', 'address', 'state', 'lga'];
const loginFields = [ 'email','password' ];

router.post('/register',
  BaseBodyValidator(registerFields),
  tryCatch(async (req: Request, res: Response) => {
  const register = await registerUser(req.body)
  res.status(register.statusCode).send(register);
}));

router.post('/login',
  BaseBodyValidator(loginFields),
  tryCatch(async (req: Request, res: Response) => {
  const login = await loginUser(req.body.email, req.body.password)
  res.status(login.statusCode).send(login);
}));
export default router;