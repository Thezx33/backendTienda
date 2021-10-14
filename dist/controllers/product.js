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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductId = exports.createProduct = exports.updateProductId = exports.getProductsName = exports.getProductId = exports.getProducts = void 0;
const sequelize_1 = require("sequelize");
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.findAll({
        where: {
            state: true
        }
    });
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
    const product = yield product_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { state: true },
                { id }
            ]
        }
    });
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
        return;
    }
    console.log(product);
    res.json(product);
});
exports.getProductId = getProductId;
const getProductsName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    const products = yield product_1.default.findAll({
        where: {
            // [Op.and]: [
            //     {
            //         state: true
            //     }
            // ],
            state: true,
            name: {
                [sequelize_1.Op.like]: `%${search}%`
            }
        }
    });
    if (products.length === 0) {
        res.status(404).json({
            msg: `No hay productos que coincidan con su búsqueda`
        });
        return;
    }
    res.json(products);
});
exports.getProductsName = getProductsName;
const updateProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { id: asd, state, createdAt, updatedAt } = _a, rest = __rest(_a, ["id", "state", "createdAt", "updatedAt"]);
    // const product = await Product.findByPk( id );
    const product = yield product_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { state: true },
                { id }
            ]
        }
    });
    if (!product) {
        res.status(404).json({
            msg: `Producto con el id ${id} no existe`
        });
    }
    const nameExists = yield product_1.default.findOne({
        where: {
            name: rest.name
        }
    });
    if (nameExists) {
        res.status(400).json({
            msg: `Ya existe un producto con el nombre ${rest.name}`
        });
    }
    const barcodeExists = yield product_1.default.findOne({
        where: {
            barcode: rest.barcode
        }
    });
    if (barcodeExists) {
        res.status(400).json({
            msg: `Ya existe un producto con el código ${rest.barcode}`
        });
    }
    yield (product === null || product === void 0 ? void 0 : product.update(rest));
    // TODO: Verificar que el proveedor exista
    res.json({
        product
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
    const { id } = req.params;
    // const product = await Product.findByPk( id );
    const product = yield product_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { state: true },
                { id }
            ]
        }
    });
    if (!product) {
        res.status(404).json({
            msg: `Producto con el id ${id} no existe`
        });
    }
    // Eliminación lógica
    yield (product === null || product === void 0 ? void 0 : product.update({ state: false }));
    res.json(product);
});
exports.deleteProductId = deleteProductId;
//# sourceMappingURL=product.js.map