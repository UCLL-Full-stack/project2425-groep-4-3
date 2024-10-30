/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Name of the user
 *            email:
 *              type: string
 *              description: Email of the user
 *            age:
 *              type: number
 *              description: Age of the user
 *            role:
 *              type: string
 *              description: Role of the user
 *            password:
 *              type: string
 *              description: Password of the user
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import e from 'express';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Get a user by ID.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the user to return.
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: A user object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParam: string = req.params.id;
        const user = await userService.getUserById(parseInt(idParam, 10));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export default userRouter;