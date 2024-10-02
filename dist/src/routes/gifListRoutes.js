"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const giftListController_1 = require("../controllers/giftListController");
/**
 * Authentication middleware
 */
const authController_1 = require("../controllers/authController");
/**
 * @openapi
 * components:
 *   schemas:
 *     GiftList:
 *       type: object
 *       properties:
 *         permite_ver_movimentacao_indisponivel:
 *           type: boolean
 *           example: true
 *         permite_ver_movimentacao_observacao:
 *           type: boolean
 *           example: true
 *         presentes:
 *           type: gift []
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *       required:
 *         - permite_ver_movimentacao_indisponivel
 *         - permite_ver_movimentacao_observacao
 *   securitySchemes:
 *      BearerToken:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 *
 */
const giftsRouter = (0, express_1.Router)();
/**
 * @openapi
 * /gift-list:
 *   get:
 *     summary: Retorna todas as listas de presentes presente no banco
 *     security:
 *      - BearerToken: []
 *     responses:
 *       200:
 *         description: Lista de presentes cadastradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GiftList'
 *     tags:
 *       - Gift List
 * @param authorization Token de autenticação
 */
giftsRouter.get('/', authController_1.authenticateUserAccess, giftListController_1.findAll);
/**
 * @openapi
 * /gift-list/{id}:
 *   get:
 *     summary: Retorna a lista de presentes com o ID solicitado
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da lista que deve ser retornado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de presentes retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/GiftList'
 *     tags:
 *       - Gift List
 */
giftsRouter.get('/:id', authController_1.authenticateUserAccess, giftListController_1.findById);
/**
 * @openapi
 * /gift-list:
 *   post:
 *     summary: Registra uma nova lista de presentes no banco
 *     security:
 *      - BearerToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GiftList'
 *     responses:
 *       200:
 *         description: Lista de presentes registrada no banco.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GiftList'
 *     tags:
 *       - Gift List
 */
giftsRouter.post('/', authController_1.authenticateUserAccess, giftListController_1.insert);
/**
 * @openapi
 * /gift-list/{id}:
 *   put:
 *     summary: Atualiza o registro de uma lista de presentes no banco
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da lista que deve ser retornado.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GiftList'
 *     responses:
 *       200:
 *         description: Lista de presentes atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GiftList'
 *     tags:
 *       - Gift List
 */
giftsRouter.put('/:id', authController_1.authenticateUserAccess, giftListController_1.update);
/**
 * @openapi
 * /gift-list/{id}:
 *   delete:
 *     summary: Remove a lista de presentes com o ID especificado
 *     security:
 *      - BearerToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID da lista de presentes que deve ser removida.
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
 *       - Gift List
 */
giftsRouter.delete('/:id', authController_1.authenticateUserAccess, giftListController_1.remove);
exports.default = giftsRouter;
