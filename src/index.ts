import express, { Router, Application } from 'express';
import { UserRouter } from './router';
import { dbInit } from './data-access';

const app: Application = express();
const router: Router = express.Router();

app.use(express.json());
app.use('/', router);

UserRouter(router);

dbInit('\x1b[32mDataBase "node_task" successfully connected');

app.listen(3000, () => console.log(
    '\n\n', '--------------------------------------------',
    '\n\n', 'Application running on http://localhost:3000', '\n\n',
    '\x1b[32mGet user by id: http://localhost:3000/user/:id [GET]' + '\n',
    '\x1b[32mSuggest user by loginSubstring and limit (query params): http://localhost:3000/suggest [GET]' + '\n',
    '\x1b[36mCreate user: http://localhost:3000/user [POST]' + '\n',
    '\x1b[33mUpdate user by id: http://localhost:3000/user/:id [PUT]' + '\n',
    '\x1b[31mDelete user by id: http://localhost:3000/user/:id [DELETE]' + '\n',));
