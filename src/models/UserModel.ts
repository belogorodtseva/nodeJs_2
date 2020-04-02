import { Sequelize, Server } from '../data-access';
import { UserModelStatic } from '../typings/entities/UserTypes';

export const UsersModel = <UserModelStatic>Server.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        field: 'isDeleted'
    }
}, {
    timestamps: false,
    schema: 'users'
});
