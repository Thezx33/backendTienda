"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductId = exports.createProduct = exports.updateProductId = exports.getProductsName = exports.getProductId = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.findAll();
    if (products.length === 0) {
        res.json({
            msg: 'No hay datos en la base de datos'
        });
        return;
    }
    res.json(products);
});
exports.getProducts = getProducts;
const getProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
        return;
    }
    res.json(product);
});
exports.getProductId = getProductId;
const getProductsName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Products name'
    });
});
exports.getProductsName = getProductsName;
const updateProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Update Id'
    });
});
exports.updateProductId = updateProductId;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Create Product'
    });
});
exports.createProduct = createProduct;
const deleteProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Delete Id'
    });
});
exports.deleteProductId = deleteProductId;
//# sourceMappingURL=product.js.map