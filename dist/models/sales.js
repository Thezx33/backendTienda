"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Sales = connection_1.default.define('Sales', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2).UNSIGNED,
        allowNull: false
    },
    // userId: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: false
    // }
}, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'sales',
    updatedAt: false
});
exports.default = Sales;
//# sourceMappingURL=sales.js.map