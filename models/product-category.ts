import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Category from './category';
import Product from './product';

const ProductsCategory = db.define('ProductsCategory', {

    productCategoryId: {
        type: DataTypes.INTEGER,
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
},{
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


export default ProductsCategory;