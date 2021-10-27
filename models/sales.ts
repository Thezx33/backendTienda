import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Sales = db.define('Sales', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    total: {
        type: DataTypes.DECIMAL(7,2).UNSIGNED,
        allowNull: false
    },
    // userId: {
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: false
    // }
},{
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'sales',
    updatedAt: false
});


export default Sales;