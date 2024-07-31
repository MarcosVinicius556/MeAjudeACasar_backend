import { Router } from 'express';
import { findAll } from '../controllers/userController';

const userRouter = Router();

export default userRouter.get('/', findAll);