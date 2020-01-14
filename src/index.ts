import express, { Router, Application } from 'express';
import {
    create,
    getById,
    suggest,
    update,
    remove
} from './requests.service';

const index: Application = express();
const router: Router = express.Router();

index.listen(3000, () => console.log(
    '\n\n', '--------------------------------------------',
    '\n\n', 'Application running on http://localhost:3000', '\n\n',
    '\x1b[32mGet user by id: http://localhost:3000/user/:id [GET]' + '\n',
    '\x1b[32mSuggest user by loginSubstring and limit (query params): http://localhost:3000/suggest [GET]' + '\n',
    '\x1b[36mCreate user: http://localhost:3000/user [POST]' + '\n',
    '\x1b[33mUpdate user by id: http://localhost:3000/user/:id [PUT]' + '\n',
    '\x1b[31mDelete user by id: http://localhost:3000/user/:id [DELETE]' + '\n',));

index.use(express.json());
index.use('/', router);

router.get('/user/:id', getById);
router.get('/suggest', suggest);
router.post('/user', create);
router.put('/user/:id', update);
router.delete('/user/:id', remove);
