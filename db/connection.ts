import { Sequelize } from 'sequelize';

const dbName: string = process.env.DBNAME || '';
const username: string = process.env.USERNAME || '';
const password: string = process.env.PASSWORD || '';
const host: string = process.env.HOST || '';


const db = new Sequelize(dbName, username, password, {
    host,
    dialect: 'mysql'
});

export default db;