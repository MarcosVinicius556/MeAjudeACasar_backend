import { Router } from 'express';
import { findAll, findById, insert, remove, update } from '../controllers/userController';

/**
 * Authentication middleware
 */
import { authenticateUserAccess } from '../controllers/authController';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         nome:
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
 *       required:
 *         - nome
 *         - email
 *         - senha
 *         - telefone
 *         - codigo_lista_presentes
 *   securitySchemes:
 *      BearerToken:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 *  
 */
const userRouter = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retorna todos os usuários registrados no banco
 *     security:
 *      - BearerToken: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *     tags:
 *       - Users
 * @param authorization Token de autenticação
 */
userRouter.get('/', authenticateUserAccess, findAll);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retorna o usuário com o ID solicitado
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do usuário que deve ser retornado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *     tags:
 *       - Users
 */
userRouter.get('/:id', authenticateUserAccess, findById);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Registra um novo usuário no banco
 *     security:
 *      - BearerToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário registrado no banco.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     tags:
 *       - Users
 */
userRouter.post('/', authenticateUserAccess, insert);

/**
 * @openapi
 * /users/{id}:
 *   post:
 *     summary: Atualiza o registro de um usuário no banco
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do usuário que deve ser retornado.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     tags:
 *       - Users
 */
userRouter.put('/:id', authenticateUserAccess, update);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Remove o usuário com o ID especificado
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do usuário que deve ser retornado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna TRUE ou FALSE, indicando se a operação foi concluída com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: Boolean
 *     tags:
 *       - Users
 */
userRouter.delete('/:id', authenticateUserAccess, remove);


export default userRouter;