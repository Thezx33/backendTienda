"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asocioaciones = void 0;
const category_1 = __importDefault(require("./category"));
const product_1 = __importDefault(require("./product"));
const provider_1 = __importDefault(require("./provider"));
const user_1 = __importDefault(require("./user"));
const asocioaciones = () => {
    product_1.default.belongsTo(user_1.default, { foreignKey: 'id' });
    // User.hasMany( Product );
    product_1.default.belongsTo(provider_1.default, { foreignKey: 'id' });
    // Provider.hasMany( Product );
    product_1.default.belongsTo(category_1.default, { foreignKey: 'id' });
    // Product.belongsToMany( Category, { through: 'pc' );
    // Category.belongsToMany( Product, { through: 'pc' );
};
exports.asocioaciones = asocioaciones;
//# sourceMappingURL=associations.js.map