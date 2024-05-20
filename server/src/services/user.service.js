import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { hashPassword } from '../utils/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userFilePath = path.resolve(__dirname, '../../data/users.json');


export const getUsers = async () => {
    try {
        const usersData = await fs.readFile(userFilePath, 'utf-8');
        if (!usersData) {
            return []
        }
        return JSON.parse(usersData);
    } catch (err) {
        console.error(`Error getUsers: ${err}`);
    }
};

export const saveUsers = async (users) => {
    try {
        await fs.writeFile(userFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (err) {
        console.error(`Error saveUsers: ${err}`);
    }
};

export const findUserByUsername = async (username) => {
    try {
        const users = await getUsers();
        return users.find(user => user.username === username);
    } catch (err) {
        console.error(`Error findUserByUsername: ${err}`);
    }
};

export const findUserById = async (id) => {
    try {
        const users = await getUsers();
        return users.find(user => user.id === id)
    } catch (err) {
        console.error(`Error findUserById ${err}`)
        throw new Error('Error finding by id')
    }
}

export const addUser = async (user) => {
    try {
        const users = await getUsers();
        users.push(user);
        await saveUsers(users);
    } catch (err) {
        console.error(`Error addUser: ${err}`);
    }
};

export const createUser = async (username, password) => {
    try {
        const hashedPassword = await hashPassword(password);

        const user = {
            username: username,
            password: hashedPassword,
            failedLoginAttempts: 0,
            lockUntil: null,
            balance: 2000
        };

        await addUser(user);
        return { success: true, message: `User: ${username} created successfully` };

    } catch (err) {
        console.error(`Error createUser: ${err}`);
        throw new Error('Error creating user');
    }
};

export const updateUser = async (updateUser) => {
    try {
        const users = await getUsers();
        const userIndex = users.findIndex(user => user.username === updateUser.username)

        if (userIndex !== -1) {
            users[userIndex] = updateUser;
            await saveUsers(users)
        }

    } catch (err) {
        console.error(`Erro updateUser: ${err}`)
        throw new Error('Error updating user')
    }
}