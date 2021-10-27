"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asocioaciones = void 0;
const category_1 = __importDefault(require("./category"));
const detail_sales_1 = __importDefault(require("./detail-sales"));
const product_1 = __importDefault(require("./product"));
const provider_1 = __importDefault(require("./provider"));
const sales_1 = __importDefault(require("./sales"));
const user_1 = __importDefault(require("./user"));
const asocioaciones = () => {
    // Product.belongsTo( User, { foreignKey: 'id' } );
    user_1.default.hasMany(product_1.default, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE' });
    // User.hasMany( Product );
    // Product.hasMany( Provider, { foreignKey: 'id' } );
    provider_1.default.hasMany(product_1.default, { foreignKey: { name: 'providerId', allowNull: false }, onDelete: 'CASCADE' });
    //Provider.hasMany( Product );
    // Product.hasMany( Category, { foreignKey: 'id' } );
    category_1.default.hasMany(product_1.default, { foreignKey: { name: 'categoryId', allowNull: false }, onDelete: 'CASCADE' });
    // Category.hasMany( Product )
    product_1.default.belongsTo(user_1.default);
    product_1.default.belongsTo(provider_1.default);
    product_1.default.belongsTo(category_1.default);
    user_1.default.hasMany(sales_1.default, { foreignKey: { name: 'userId', allowNull: false } });
    product_1.default.hasMany(detail_sales_1.default, { foreignKey: { name: 'productId', allowNull: false }, onDelete: 'CASCADE' });
    sales_1.default.hasMany(detail_sales_1.default, { foreignKey: { name: 'saleId', allowNull: false }, onDelete: 'CASCADE' });
    detail_sales_1.default.belongsTo(product_1.default);
    detail_sales_1.default.belongsTo(sales_1.default);
    sales_1.default.belongsTo(user_1.default);
};
exports.asocioaciones = asocioaciones;
//# sourceMappingURL=associations.js.map