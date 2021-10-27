"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DetailSales = connection_1.default.define('DetailSales', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
    },
    unitPrice: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2).UNSIGNED,
        allowNull: false
    },
    // saleId: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: false
    // },
    // productId: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: false
    // }
}, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'detail-sales',
    updatedAt: false
});
// Category.belongsToMany( Product, { through: ProductsCategory } );
exports.default = DetailSales;
//# sourceMappingURL=detail-sales.js.map