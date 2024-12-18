/**
 * @swagger
 *   components:
 *    securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *    schemas:
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
import bikeService from '../service/bike.service';

const bikeRouter = express.Router();

/**
 * @swagger
 * /bikes:
 *   get:
 *      security:
 *        - bearerAuth: [] 
 *      summary: Get a list of all bikes.
 *      responses:
 *       200:
 *         description: A list of bikes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Bike'
 */
bikeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bikes = await bikeService.getAllBikes();
        res.status(200).json(bikes);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /bikes/{id}:
 *  get:
 *      security:
 *        - bearerAuth: [] 
 *      summary: Get a Bike by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The Bike id.
 *      responses:
 *          200:
 *              description: A Bike object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Bike'
 */
bikeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParam : string = req.params.id;
        const Bike = await bikeService.getBikeById(parseInt(idParam, 10));
        res.status(200).json(Bike);
    } catch (error) {
        next(error);
    }
});



export { bikeRouter };
