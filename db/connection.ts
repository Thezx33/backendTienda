import { Sequelize } from 'sequelize';

const dbName: string = process.env.DBNAME as string;
const username: string = process.env.USERNAME as string;
const password: string = process.env.PASSWORD as string;
const host: string = process.env.HOST as string;


const db = new Sequelize('TEST', 'thezx', 'Descargar123.', {
    host: 'localhost',
    dialect: 'mariadb'
});

export default db;