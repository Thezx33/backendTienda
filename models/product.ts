import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Product = db.define('Product', {

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.DECIMAL(7, 2).UNSIGNED,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(3000)
    },
    barcode: {
        type:DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    providerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
},{
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

export default Product;