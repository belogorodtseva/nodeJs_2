import { users } from './users';

export const addUser = (login: string, password: string, age: number) => {
    const id = getNextId();
    users.push({ login, password, age, id, isDeleted: false });
    return id;
};

export const editUser = (id: number, login: string, password: string, age: number) => {
    users.forEach(item => {
        if (item.id !== id) return;
        if (login) item.login = login;
        if (password) item.password = password;
        if (age) item.age = age;
    });
};

export const deleteUser = (id: number) => {
    users.forEach(item => {
        if (item.id === id) item.isDeleted = true;
    });
};

export const getUserById = (id: number): object => {
    return users[users.findIndex(item => item.id === id)];
};

export const getAutoSuggestUsers = (loginSubstring: string, limit: string) => {
    const regexp = new RegExp(loginSubstring, 'i');

    return users
        .filter(item => regexp.test(item.login))
        .sort((a, b) => {
            if (a.login > b.login) return 1;
            if (a.login < b.login) return -1;
            return 0;
        })
        .splice(0, Number(limit));
};

const getNextId = (): number => {
    const currentId = users.reduce((prev, item) => {
        const id = item.id;
        return (id > prev) ? id : prev;
    }, 0);
    return currentId + 1;
};
