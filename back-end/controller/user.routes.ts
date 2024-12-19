/**
 * @swagger
 *   components:
 *    securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Id of the user
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
 *      AuthenticationResponse:
 *              type: object
 *              properties:
 *                message:
 *                   type: string
 *                   format: byte
 *                token:
 *                  type: string
 *                  format: byte
 *                username:
 *                  type: string
 *                  format: byte
 *      AuthenticationRequest:
 *            type: object
 *            properties:
 *              name:
 *                  type: string
 *                  format: byte
 *              password:   
 *                  type: string
 *                  format: byte
 *      UserInput:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Name of the user
 *                  email:
 *                      type: string
 *                      description: Email of the user
 *                  age:
 *                      type: number
 *                      description: Age of the user
 *                  role:
 *                      type: string
 *                      description: Role of the user
 *                  password:
 *                      type: string
 *                      description: Password of the user
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput, AuthenticationRequest } from '../types';
import { error } from 'console';
import { User } from '../model/User';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users
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
 *      security:
 *       - bearerAuth: [] 
 *      summary: Get a user by Id
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the user to return
 *         schema:
 *          type: integer
 *      responses:
 *       200:
 *        description: A user object
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

/**
 * @swagger
 * /users/makeAdmin/{name}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Change a user to admin
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Username of the user to change to admin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully changed to admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: change was successful
 *                 message:
 *                   type: string
 */
userRouter.put('/makeAdmin/:name', async (req: Request , res: Response, next: NextFunction) => {
    try {
        const username = req.params.name;
        console.log(username)
        const result = await userService.makeUserAdmin(username)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 *  paths:
 *     /users/login:
 *       post:  
 *         summary: Authenticate user
 *         requestBody:
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthenticationRequest'
 *         responses:
 *              '200':
 *                  description: The authenticated user object is returned
 *                  content:
 *                      schema: 
 *                          $ref: '#/components/schemas/AuthenticationResponse'
 * 
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <AuthenticationRequest>req.body;
        const response = await userService.authenticate(userInput)
        res.status(200).json({ message:'Authentication succesful',...response})
    } catch (error){
        next(error);
    }
})

/**
 * @swagger 
 * paths: 
 *  /users/signup:
 *      post:   
 *          summary: Register a new user
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref:  "#/components/schemas/UserInput"
 *          responses: 
 *              '200': 
 *                  description: Registered user is returned 
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref:  "#/components/schemas/User"                        
 */ 
userRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})

export default userRouter;