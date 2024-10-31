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
 *            startDate:
 *              type: string
 *              format: date-time
 *              description: Start date Bike
 *            endDate:
 *              type: string
 *              format: date-time
 *              description: End date Bike
 *            size:
 *              type: string
 *              enum: [S | M | L | XL]
 *            cost:
 *              type: number
 *              description: Cost of the bike.
 */

import express, { NextFunction, Request, Response } from 'express';
import rentService from '../service/rent.service';

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
 * paths:
 *  /rents/rentAbike/{bikeId}/{rentId}:
 *     put:
 *         summary: rent a bike
 *         parameters: 
 *              - name: bikeId
 *                in: path 
 *                required: true
 *                schema: 
 *                  type: integer
 *                  format: int64
 *              - name: rentId
 *                in: path 
 *                required: true
 *                schema: 
 *                  type: integer
 *                  format: int64
 * 
 *         responses:
 *              '200':
 *                  description: Bike is added to a rent
 */ 
rentRouter.put("/rentAbike/:bikeId/:rentId", (req: Request, res: Response, next: NextFunction) => {
    try {
        const bikeId : string = req.params.bikeId;
        const rentId : string = req.params.rentId;
        const rent = rentService.rentABike(parseInt(bikeId, 10),parseInt(rentId, 10));
        res.status(200).json(rent)
    } catch (error) {
        next(error);
    };
});

export { rentRouter };
