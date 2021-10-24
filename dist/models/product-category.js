"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const ProductsCategory = connection_1.default.define('ProductsCategory', {
    productCategoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    // categoryId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Category,
    //         key: 'id'
    //     },
    //     allowNull: false
    // },
    // productId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Product,
    //         key: 'id'
    //     },
    //     allowNull: false
    // },
}, {
    createdAt: false,
    updatedAt: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'productcategory'
});
// Product.belongsToMany( Category, {
//     through: ProductsCategory,
//     foreignKey: 'product_id'
// });
// Category.belongsToMany( Product, {
//     through: ProductsCategory,
//     foreignKey: 'category_id'
// });
exports.default = ProductsCategory;
//# sourceMappingURL=product-category.js.map