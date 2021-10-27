import Category from './category';
import DetailSales from './detail-sales';
import Product from './product';
import Provider from './provider';
import Sales from './sales';
import User from './user';


export const asocioaciones = () => {
    
    // Product.belongsTo( User, { foreignKey: 'id' } );
    User.hasMany( Product, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE' } );

    // User.hasMany( Product );

    // Product.hasMany( Provider, { foreignKey: 'id' } );
    Provider.hasMany( Product, { foreignKey: { name: 'providerId', allowNull: false }, onDelete: 'CASCADE' } );
    //Provider.hasMany( Product );

    // Product.hasMany( Category, { foreignKey: 'id' } );
    Category.hasMany( Product, { foreignKey: { name: 'categoryId', allowNull: false }, onDelete: 'CASCADE' } );
    // Category.hasMany( Product )

    Product.belongsTo( User );
    Product.belongsTo( Provider );
    Product.belongsTo( Category );

    User.hasMany( Sales, { foreignKey: { name: 'userId', allowNull: false } } );
    Product.hasMany( DetailSales, { foreignKey: { name: 'productId', allowNull: false }, onDelete: 'CASCADE' } );
    Sales.hasMany( DetailSales, { foreignKey: { name: 'saleId', allowNull: false }, onDelete: 'CASCADE' } );
    
    DetailSales.belongsTo( Product );
    DetailSales.belongsTo( Sales );
    Sales.belongsTo( User );

}