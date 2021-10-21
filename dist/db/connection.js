"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DBNAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const db = new sequelize_1.Sequelize('Prueba', 'thezx', 'Descargar123.', {
    host: 'localhost',
    dialect: 'mariadb'
});
exports.default = db;
//# sourceMappingURL=connection.js.map