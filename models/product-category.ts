import { DataTypes } from 'sequelize';
import db from '../db/connection';

const ProductsCategory = db.define('ProductsCategory', {

    categoryId: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    productId: {
        type: DataTypes.INTEGER.UNSIGNED
    },
},{
    createdAt: false,
    updatedAt: false,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'ProductsCategory'
});



export default ProductsCategory;