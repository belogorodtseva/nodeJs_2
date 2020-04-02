import { Request, Response, NextFunction, Router } from 'express';
import UserService from '../../services/UserService';
import { ParamsDictionary } from 'express-serve-static-core';
import { UserDTO } from '../../typings/entities/UserTypes';
import { addUserSchema, editUserSchema, validationMiddleware } from './UserValidators';

export const UserController = (router: Router): void => {
    router.get('/user/:id', async (req: Request, res: Response): Promise<void> => {
        const id: number = Number(req.params.id);
        const user: Object = await UserService.getUserById(id);
        res.json({ user });
    });

    router.get('/suggest', async (req: Request, res: Response): Promise<void> => {
        const { loginSubstring, limit }: ParamsDictionary = req.query;
        const users: Object = await UserService.getAutoSuggestUsers(loginSubstring, Number(limit));
        res.json({ users });
    });

    router.post('/user', (req: Request, res: Response, next: NextFunction) => validationMiddleware(req, res, next, addUserSchema),
        async (req: Request, res: Response): Promise<void> => {
            const { login, password, age }: UserDTO = req.body;
            const id: string = await UserService.addUser(login, password, age);
            res.status(201).json({ id });
        }
    );

    router.put('/user/:id', (req: Request, res: Response, next: NextFunction) => validationMiddleware(req, res, next, editUserSchema),
        async (req: Request, res: Response): Promise<void> => {
            const { login, password, age }: UserDTO = req.body;
            const id: number = Number(req.params.id);
            const success: boolean = await UserService.editUser(id, login, password, age);
            if (success) {
                res.status(200).json({ message: 'user edited success' });
                return;
            }
            res.status(400).json({ message: 'something went wrong' });
        }
    );

    router.delete('/user/:id', async (req: Request, res: Response): Promise<void> => {
        const id: number = Number(req.params.id);
        const success: boolean = await UserService.deleteUser(id);
        if (success) {
            res.status(200).json({ message: 'user deleted success' });
            return;
        }
        res.status(400).json({ message: 'something went wrong' });
    });
};
