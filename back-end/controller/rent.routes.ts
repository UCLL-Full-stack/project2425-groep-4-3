/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Rent:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             description: The rent Id
 *           startDate:
 *             type: string
 *             format: date-time
 *             description: Start date Rent
 *           returned:
 *             type: boolean
 *             description: Is the bike returned or not
 *           cost:
 *             type: number
 *             description: Cost of the rent
 *           bike:
 *             $ref: '#/components/schemas/Bike'
 *           user:
 *             $ref: '#/components/schemas/User'
 *           accessories:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Accessory'
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             description: Id of the User
 *           name:
 *             type: string
 *             description: Name of the user
 *           email:
 *             type: string
 *             description: Email of the user
 *           age:
 *             type: number
 *             description: Age of the user
 *           role:
 *             type: string
 *             description: Role of the user
 *           password:
 *             type: string
 *             description: Password of the user
 *       Bike:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             description: Id of the Bike
 *           brand:
 *             type: string
 *             description: Brand of the Bike
 *           model:
 *             type: string
 *             description: Model of the Bike
 *           location:
 *             type: string
 *             description: Location of the Bike
 *           size:
 *             type: string
 *             enum: [S, M, L, XL]
 *             description: Size of the Bike
 *           cost:
 *             type: number
 *             description: Cost of the Bike
 *       Accessory:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             description: Id of the Accessory
 *           name:
 *             type: string
 *             description: Name of the Accessory
 *           amount:
 *             type: number
 *             format: int64
 *             description: Amount of the Accessory
 *           cost:
 *             type: number
 *             format: int64
 *             description: Cost of the Accessory
 *       RentInputCreate:
 *         type: object
 *         description: RentInput create is with Username 
 *         properties:
 *           startDate:
 *             type: string
 *             format: date-time
 *             description: Start date Rent
 *           returned:
 *             type: boolean
 *             description: Is the bike returned or not
 *           cost:
 *             type: number
 *             description: Cost of the rent.
 *           bike:
 *             $ref: '#/components/schemas/Bike'
 *           userName:
 *             type: string
 *             description: The name of the user who rents the bike
 *           accessoriesIdList:
 *             type: array
 *             items:
 *               type: number
 *               description: The id of the chosen accessories
 */


import express, { NextFunction, Request, Response } from 'express';
import rentService from '../service/rent.service';
import { Rent } from '../model/Rent';
import { RentInput, RentInputCreate, RentInputUpdate } from '../types';

const rentRouter = express.Router();

/**
 * @swagger
 * /rents:
 *   get:
 *       security:
 *        - bearerAuth: [] 
 *       summary: Get all rents
 *       responses:
 *        200:
 *         description: Complete list of rents
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
 *      security:
 *        - bearerAuth: [] 
 *      summary: Get a Rent by id
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The Rent id
 *      responses:
 *          200:
 *              description: A Rent
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
 *     security:
 *       - bearerAuth: [] 
 *     summary: Rent a bike(Create Rent)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentInputCreate'
 *     responses:
 *       200:
 *         description: The created rent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rent'
 */
rentRouter.post("/rentAbike", (req: Request, res: Response, next: NextFunction) => {
    try {
        const rent = <RentInputCreate>req.body;
        const result = rentService.rentAbike(rent);
        return res.status(200).json(result)
    } catch (error) {
        next(error);
    };
});

/**
 * @swagger
 * paths: 
 *  /rents/updateById/{id}:
 *      put:    
 *          security:
 *              - bearerAuth: []
 *          summary: Update rent with the given id 
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
 *                              $ref: '#/components/schemas/Rent'                 
 *          responses: 
 *              '200':
 *                  description: The updated rent is returned
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Rent'
 */        
rentRouter.put("/updateById/:id", async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const idParam : string = req.params.id;
        const rentInfo = <RentInputUpdate>req.body;
        
        const updatedRent = await rentService.updateRent(rentInfo, parseInt(idParam, 10));
        return res.status(200).json(updatedRent);
    } catch (error) {    
        next(error);
    };
}); 

/**
 * @swagger
 * paths: 
 *  /rents/byId/{id}:
 *      delete:    
 *          security:
 *              - bearerAuth: []
 *          summary: Delete rent with the given id
 *          parameters: 
 *              - name: id
 *                in: path 
 *                required: true
 *                schema: 
 *                  type: integer
 *                  format: int64
 *                  description: Id of the rent you want to delete
 *          responses: 
 *              '200':
 *                  description: The deleted rent
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Rent'
 */        
rentRouter.delete("/byId/:id", async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const idParam : string = req.params.id;
        const deletedRent = await rentService.deleteRentById(parseInt(idParam, 10));
        return res.status(200).json(deletedRent);
    } catch (error) {    
        next(error);
    }
});

/**
 * @swagger
 * /rents/user/{name}:
 *   get:
 *       security:
 *        - bearerAuth: [] 
 *       summary: get rents with user that hase the given username
 *       parameters: 
 *            - name: name
 *              in: path 
 *              required: true
 *              schema: 
 *                type: string
 *                description: The name of the logged-in User
 *       responses:
 *        200:
 *         description: A list of rents of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Rent'
 */
rentRouter.get('/user/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nameParam : string = req.params.name;
        console.log(`controller:${nameParam}`)
        const rents = await rentService.getRentsByUserName(nameParam);
        res.status(200).json(rents);
    } catch (error) {
        next(error);
    }
});
export { rentRouter };
