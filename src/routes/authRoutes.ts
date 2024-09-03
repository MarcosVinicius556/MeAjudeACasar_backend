import { Router } from 'express';
import { generateAccessToken } from '../controllers/authController';
/**
 * @openapi
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: 'fulaninho@example.com'
 *         senha:
 *           type: string
 *           example: '**********'
 *       required:
 *         - email
 *         - senha
 *     TokenDTO:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: 'your_jwt_token'
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           example: '2024-09-03T12:00:00Z'
 *  
 */
const authRouter = Router();

/**
 * @openapi
 * /auth/generate:
 *   post:
 *     summary: Gera um token com expiração de 8 horas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenDTO'
 *     tags:
 *       - Auth
 */
authRouter.post('/generate', generateAccessToken);

export default authRouter;