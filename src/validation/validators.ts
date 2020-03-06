import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '../userModelStatic';
import Joi from '@hapi/joi';

export const validationMiddleware = async (req: Request, res: Response, next: NextFunction, validationSchema: any): Promise<void> => {
  const { login, password, age }: UserDTO = req.body;
  try {
      await validationSchema.validateAsync({ login, password, age });
      next();
      return;
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

export const addUserSchema: Joi.ObjectSchema<{ login: string; password: string; age: number; }> = Joi.object({
    login: Joi
        .string()
        .pattern(new RegExp(/^[a-z0-9_.]+$/i))
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp(/\d/))
        .pattern(new RegExp(/[a-z]/i))
        .required(),

    age: Joi
        .number()
        .integer()
        .min(4)
        .max(130)
        .required()
});

export const editUserSchema: Joi.ObjectSchema<{ login: string; password: string; age: number; }> = Joi.object({
    login: Joi
        .string()
        .pattern(new RegExp(/^[a-z0-9_.]+$/i)),

    password: Joi
        .string()
        .pattern(new RegExp(/\d/))
        .pattern(new RegExp(/[a-z]/i)),

    age: Joi
        .number()
        .integer()
        .min(4)
        .max(130)
});
