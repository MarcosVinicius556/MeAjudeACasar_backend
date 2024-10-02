"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const giftController_1 = require("../controllers/giftController");
/**
 * Authentication middleware
 */
const authController_1 = require("../controllers/authController");
/**
 * @openapi
 * components:
 *   schemas:
 *     Gift:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: 'Cadeira XXXXXX-XXXXXX'
 *         descricao:
 *           type: string
 *           example: 'Descrição da cadeira'
 *         url_foto:
 *           type: string
 *           example: 'http://endereco-da-foto-da-cadeira'
 *         status:
 *           type: string
 *           example: 'DISPONIVEL'
 *         media_de_valores:
 *           type: number
 *           example: 600
 *         possiveis_locais_de_compra:
 *           type: string[]
 *           example: [
 *                      "http://endereco-de-compra-da-cadeira",
 *                      "Loja X, Y, Z"
 *                    ]
 *         observador_por:
 *           type: string
 *           exemplo: fulaninhoX
 *         comprado_por:
 *           type: string
 *           exemplo: fulaninhoX
 *         createdAt:
 *           type: string
 *           exemplo: 2024-07-31T23:24:44.243+00:00
 *         updatedAt:
 *           type: string
 *           exemplo: 2024-07-31T23:24:44.243+00:00
 *       required:
 *         - nome
 *         - descricao
 *         - url_foto
 *         - status
 *   securitySchemes:
 *      BearerToken:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 *
 */
const giftRouter = (0, express_1.Router)();
/**
 * @openapi
 * /gifts/byGiftList/{giftListId}:
 *   get:
 *     summary: Retorna todos os presentes de uma lista de presentes
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: giftListId
 *         in: path
 *         required: true
 *         description: O ID da lista de presentes onde está o presente.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de presentes retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gift'
 *     tags:
 *       - Gifts
 * @param authorization Token de autenticação
 */
giftRouter.get('/byGiftList/:giftListId', authController_1.authenticateUserAccess, giftController_1.findAll);
/**
 * @openapi
 * /gifts/{giftListId}/{giftId}:
 *   get:
 *     summary: Retorna o presente com o ID solicitado
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: giftListId
 *         in: path
 *         required: true
 *         description: O ID da lista de presentes onde está o presente.
 *         schema:
 *           type: string
 *       - name: giftId
 *         in: path
 *         required: true
 *         description: O ID do presente que deve ser retornado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Presente retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Gift'
 *     tags:
 *       - Gifts
 */
giftRouter.get('/:giftListId/:giftId', authController_1.authenticateUserAccess, giftController_1.findById);
/**
 * @openapi
 * /gifts/{giftListId}:
 *   post:
 *     summary: Registra um novo presente no banco
 *     security:
 *      - BearerToken: []
 *     parameters:
 *      - name: giftListId
 *        in: path
 *        required: true
 *        description: O ID da lista de presentes onde está o presente.
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gift'
 *     responses:
 *       200:
 *         description: Gift registrado no banco.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gift'
 *     tags:
 *       - Gifts
 */
giftRouter.post('/:giftListId', authController_1.authenticateUserAccess, giftController_1.insert);
/**
 * @openapi
 * /gifts/{giftListId}/{giftId}:
 *   put:
 *     summary: Atualiza o registro de um presente no banco
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: giftListId
 *         in: path
 *         required: true
 *         description: O ID da lista de presentes onde está o presente.
 *         schema:
 *           type: string
 *       - name: giftId
 *         in: path
 *         required: true
 *         description: O ID do presente que deve ser atualizado.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gift'
 *     responses:
 *       200:
 *         description: Presente que foi atualizado!.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gift'
 *     tags:
 *       - Gifts
 */
giftRouter.put('/:giftListId/:giftId', authController_1.authenticateUserAccess, giftController_1.update);
/**
 * @openapi
 * /gifts/{giftListId}/{giftId}:
 *   delete:
 *     summary: Remove o presente com o ID especificado
 *     security:
 *      - BearerToken: []
 *     parameters:
 *      - name: giftListId
 *        in: path
 *        required: true
 *        description: O ID da lista de presentes onde está o presente.
 *        schema:
 *          type: string
 *      - name: giftId
 *        in: path
 *        required: true
 *        description: O ID do presente que deve ser removido.
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Retorna TRUE ou FALSE, indicando se a operação foi concluída com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: Boolean
 *     tags:
 *       - Gifts
 */
giftRouter.delete('/:giftListId/:giftId', authController_1.authenticateUserAccess, giftController_1.remove);
exports.default = giftRouter;
