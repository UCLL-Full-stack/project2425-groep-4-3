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
 *              description: Bike id
 *            brand:
 *              type: string
 *              description: The brand of the bike
 *            model:
 *              type: string
 *              description: The model of the bike 
 *            location:
 *              type: string
 *              description: The location of the Bike
 *            size:
 *              type: string
 *              enum: [S | M | L | XL]
 *              description: Size of the bike.
 *            cost:
 *              type: number
 *              description: Cost of the bike.
 *      BikeInput:
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
import { BikeInput, Role } from '../types';
import { generateJwtToken } from '../model/jwt';

const bikeRouter = express.Router();
export { bikeRouter };

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
 *      summary: Get a Bike by id
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The bike Id
 *      responses:
 *          200:
 *              description: A complete Bike
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

/**
 * @swagger
 * /bikes:
 *   post:
 *     security:
 *       - bearerAuth: [] 
 *     summary: Create a bike
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BikeInput'
 *     responses:
 *       200:
 *         description: The created bike.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bike'
 */
bikeRouter.post("/",async (req : Request , res:Response, next: NextFunction) =>{
    try{
        // const {name, role} = req.auth;
        const bike = <BikeInput>req.body;
        const result = bikeService.createBike(bike)//,role)
        return res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

/**
 * @swagger
 * paths: 
 *  /bikes/updateById/{id}:
 *      put:    
 *          security:
 *              - bearerAuth: []
 *          summary: Update user with the given id and new bike
 *          parameters:
 *              - name: id
 *                in: path 
 *                required: true
 *                schema: 
 *                  type: integer
 *                  format: int64
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Bike'                 
 *          responses: 
 *              '200':
 *                  description: The updated bike is returned
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Bike'
 */        
bikeRouter.put("/updateById/:id", async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const idParam : string = req.params.id;
        const bikeInfo = <BikeInput>req.body;
        
        const updatedBike = await bikeService.updateBikeById(bikeInfo, parseInt(idParam, 10));
        return res.status(200).json(updatedBike);
    } catch (error) {    
        next(error);
    };
}); 

/**
 * @swagger
 * paths: 
 *  /bikes/byId/{id}:
 *      delete:    
 *          security:
 *              - bearerAuth: []
 *          summary: Delete user with the given id
 *          parameters: 
 *              - name: id
 *                in: path 
 *                required: true
 *                schema: 
 *                  type: integer
 *                  format: int64
 *          responses: 
 *              '200':
 *                  description: The deleted user is returned
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Bike'
 */        
bikeRouter.delete("/byId/:id", async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const idParam : string = req.params.id;
        const deletedBike = await bikeService.deleteBikeById(parseInt(idParam, 10));
        return res.status(200).json(deletedBike);
    } catch (error) {    
        next(error);
    }
});
