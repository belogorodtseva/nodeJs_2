import { Request, Response } from 'express';
import { getUserById, getAutoSuggestUsers, addUser, editUser, deleteUser } from './data.service';
import { schema } from './validation';

export const getById = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    res.json({ user: getUserById(id) });
};

export const suggest = (req: Request, res: Response,) => {
    const { loginSubstring, limit } = req.query;
    const suggestions = getAutoSuggestUsers(loginSubstring, limit);
    if (!!suggestions.length) {
        res.status(200).json({ users: suggestions });
    } else {
        res.status(404).json({ message: 'No suggestions.' });
    }
};

export const create = async (req: Request, res: Response) => {
    const { login, password, age } = req.body;
    try {
        await schema.validateAsync({ login, password, age });
        addUser(login, password, age);
        res.status(200).json({ message: 'User successfully created.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const update = async (req: Request, res: Response) => {
    const { login, password, age } = req.body;
    const id: number = parseInt(req.params.id, 10);

    try {
        await schema.validateAsync({ login, password, age });
        editUser(id, login, password, age);
        res.status(200).json({ message: 'User successfully updated.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const remove = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    deleteUser(id);
    res.status(200).json({ message: 'User successfully deleted.' });
};
