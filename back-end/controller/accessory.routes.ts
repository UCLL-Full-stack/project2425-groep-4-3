/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Accessory:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Name of the accessory
 *            amount:
 *              type: number
 *              description: Amount of the accessory
 *            cost:
 *              type: number
 *              description: Cost of the accessory.
 */
import express, { NextFunction, Request, Response } from 'express';
import accessoryService from '../service/accessory.service';

const accessoryRouter = express.Router();

/**
 * @swagger
 * /accessories:
 *   get:
 *     summary: Get a list of all accessories.
 *     responses:
 *       200:
 *         description: A list of accessories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Accessory'
 */
accessoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessories = await accessoryService.getAllAccessories();
        res.status(200).json(accessories);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /accessories/{id}:
 *  get:
 *    summary: Get an accessory by ID.
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: ID of the accessory to return.
 *    responses:
 *      200:
 *        description: An accessory object.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Accessory'
 */
accessoryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParam : string = req.params.id;
        const accessory = await accessoryService.getAccessoryById(parseInt(idParam, 10));
        res.status(200).json(accessory);
    } catch (error) {
        next(error);
    }
});

export default accessoryRouter;