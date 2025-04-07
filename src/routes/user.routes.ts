import express, { type Request, type Response } from 'express'
import { registerUser } from '../controllers/user.controller';
import tryCatch from '../utils/tryCatch';

const router = express.Router()

router.post('/register', 
  tryCatch(async (req, res) => {
  const register = await registerUser(req.body)
  res.status(register.statusCode).send(register);
}))


export default router;