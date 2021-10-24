import Category from "./category";
import Product from "./product";
import Provider from "./provider";
import User from "./user";


export const asocioaciones = () => {
    
    Product.belongsTo( User, { foreignKey: 'id' } );
    // User.hasMany( Product );

    Product.belongsTo( Provider, { foreignKey: 'id' } );
    // Provider.hasMany( Product );

    Product.belongsTo( Category, { foreignKey: 'id' } );

}