"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const ProductsCategory = connection_1.default.define('ProductsCategory', {
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    },
}, {
    createdAt: false,
    updatedAt: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'ProductsCategory'
});
exports.default = ProductsCategory;
//# sourceMappingURL=product-category.js.map