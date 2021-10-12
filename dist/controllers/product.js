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
const sequelize_1 = require("sequelize");
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
    const { search } = req.query;
    const products = yield product_1.default.findAll({
        where: {
            name: {
                [sequelize_1.Op.like]: `%${search}%`
            }
        }
    });
    res.json({
        products
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
    const { body } = req;
    const product = {
        name: body.name,
        price: body.price,
        description: body.description || '',
        barcode: body.barcode,
        userId: body.userId,
        providerId: body.providerId
    };
    console.log(product);
    try {
        const nameExists = yield product_1.default.findOne({
            where: {
                name: product.name
            }
        });
        if (nameExists) {
            res.status(400).json({
                msg: `Ya existe un producto con el nombre ${product.name}`
            });
            return;
        }
        const barcodeExists = yield product_1.default.findOne({
            where: {
                barCode: product.barcode
            }
        });
        if (barcodeExists) {
            res.status(400).json({
                msg: `Ya existe un producto con el código de barras ${product.barcode}`
            });
            return;
        }
        // TODO: Validaciones para comprobar que el id del proveedor existe.
        // TODO: Validaciones para comprobar que el id del usuario existe.
        const newProduct = yield product_1.default.create(product);
        res.json(newProduct);
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.createProduct = createProduct;
const deleteProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Delete Id'
    });
});
exports.deleteProductId = deleteProductId;
//# sourceMappingURL=product.js.map