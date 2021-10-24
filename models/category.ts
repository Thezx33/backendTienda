import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Category = db.define('Category', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
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
    tableName: 'categories'
});

// Category.belongsToMany( Product, { through: ProductsCategory } );



export default Category;