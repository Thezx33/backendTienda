import { DataTypes } from 'sequelize';
import db from '../db/connection';

const DetailSales = db.define('DetailSales', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
    },
    unitPrice: {
        type: DataTypes.DECIMAL(7,2).UNSIGNED,
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
},{
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'detail-sales',
    updatedAt: false
});

// Category.belongsToMany( Product, { through: ProductsCategory } );

export default DetailSales;