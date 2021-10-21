import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('User', {

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    pass: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

},{
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

export default User;