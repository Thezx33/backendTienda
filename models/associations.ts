import Category from "./category";
import Product from "./product";
import Provider from "./provider";
import User from "./user";


export const asocioaciones = () => {
    
    // Product.belongsTo( User, { foreignKey: 'id' } );
    Product.belongsTo( User );
    // User.hasMany( Product );

    // Product.belongsTo( Provider, { foreignKey: 'id' } );
    Product.belongsTo( Provider );
    //Provider.hasMany( Product );

    // Product.belongsTo( Category, { foreignKey: 'id' } );
    Product.belongsTo( Category );
    // Category.hasMany( Product )
}