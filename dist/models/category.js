"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Category = connection_1.default.define('Category', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'categories'
});
// Category.belongsToMany( Product, { through: ProductsCategory } );
exports.default = Category;
//# sourceMappingURL=category.js.map