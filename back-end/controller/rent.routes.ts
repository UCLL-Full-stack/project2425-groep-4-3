/**
 * @swagger
 *   components:
 *    schemas:
 *      Rent:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            startDate:
 *              type: string
 *              format: date-time
 *              description: Start date Rent
 *            endDate:
 *              type: string
 *              format: date-time
 *              description: End date Rent
 *            cost:
 *              type: number
 *              description: Cost of the rent.
 *            bike:
 *              $ref: '#/components/schemas/Bike'
 *      Bike:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            brand:
 *              type: string
 *              description: Brand Bike
 *            model:
 *              type: string
 *              description: Model Bike
 *            location:
 *              type: string
 *              description: location Bike
 *            size:
 *              type: string
 *              enum: [S | M | L | XL]
 *            cost:
 *              type: number
 *              description: Cost of the bike.
 */

import express, { NextFunction, Request, Response } from 'express';
import rentService from '../service/rent.service';
import { Rent } from '../model/Rent';
import { RentInput } from '../types';

const rentRouter = express.Router();

/**
 * @swagger
 * /rents:
 *   get:
 *     summary: Get a list of all rents.
 *     responses:
 *       200:
 *         description: A list of rents.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Rent'
 */
rentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rents = await rentService.getAllRents();
        res.status(200).json(rents);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /rents/{id}:
 *  get:
 *      summary: Get a Rent by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The Rent id.
 *      responses:
 *          200:
 *              description: A Rent object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Rent'
 */
rentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParam : string = req.params.id;
        const Rent = await rentService.getRentById(parseInt(idParam, 10));
        res.status(200).json(Rent);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /rents/rentAbike:
 *   post:
 *      summary: rent a bike
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rent'
 *      responses:
 *         200:
 *            description: The created schedule.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Rent'
 */
rentRouter.post("/rentAbike", (req: Request, res: Response, next: NextFunction) => {
    try {
        const rent = <RentInput>req.body;
        const result = rentService.rentAbike(rent);
        res.status(200).json(result)
    } catch (error) {
        next(error);
    };
});

export { rentRouter };
