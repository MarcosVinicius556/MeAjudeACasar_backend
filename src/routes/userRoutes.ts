import { Router } from 'express';
import { testRouteConfig } from '../controllers/userController';

const userRouter = Router();

export default userRouter.get('/test', testRouteConfig);