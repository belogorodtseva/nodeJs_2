import { dbConfig } from '../dbConfig';
const { user, password, host, port, dbName } = dbConfig;

export const Sequelize = require('sequelize');
export const Server = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${dbName}`);
export const Op = Sequelize.Op;
export const dbInit = (message: string): void => {
    Server.authenticate()
      .then(() => console.log(message))
      .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
      });
};
