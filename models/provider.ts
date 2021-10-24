import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Product from './product';

const Provider = db.define('Provider', {

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    tableName: 'providers'
});



export default Provider;