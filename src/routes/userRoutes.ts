import { Router } from 'express';
import { findAll } from '../controllers/userController';
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: uuid
 *           example: '123kn123kn21389fsk'
 *         name:
 *           type: string
 *           example: 'Fulano de Tal'
 *         email:
 *           type: string
 *           example: 'fulaninho@example.com'
 *         senha:
 *           type: string
 *           example: '**********'
 *         telefone:
 *           type: string
 *           example: '123456789'
 *         role:
 *           type: string
 *           example: 'TYPE_OF_ACCESS'
 *         codigo_lista_presentes:
 *           type: string
 *           example: '123k4jh23f8hdsfs2'
 *       required:
 *         - name
 *         - email
 *         - senha
 *         - telefone
 *         - codigo_lista_presentes
 *  
 */
const userRouter = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retorna todos os usuários registrados no banco
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *     tags:
 *       - Users
 */
userRouter.get('/', findAll);

export default userRouter;