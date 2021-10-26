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
exports.deleteProductId = exports.createProduct = exports.updateProductId = exports.getProductId = exports.getProducts = void 0;
const sequelize_1 = require("sequelize");
const category_1 = __importDefault(require("../models/category"));
const product_1 = __importDefault(require("../models/product"));
const provider_1 = __importDefault(require("../models/provider"));
const user_1 = __importDefault(require("../models/user"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.findAll({
        where: {
            state: true
        },
        include: [
            {
                model: user_1.default,
                attributes: ['name', 'email']
            },
            {
                model: provider_1.default,
                attributes: ['name', 'email', 'phone']
            },
            {
                model: category_1.default,
                attributes: ['name']
            }
        ],
        // attributes: ['id','name','email']
        attributes: ['id', 'name', 'price', 'barcode']
    });
    if (products.length === 0) {
        res.json({
            msg: 'No hay datos en la base de datos'
        });
        return;
    }
    res.json({ products });
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
        },
        include: [
            {
                model: user_1.default,
                attributes: ['name', 'email']
            },
            {
                model: provider_1.default,
                attributes: ['name', 'email', 'phone']
            },
            {
                model: category_1.default,
                attributes: ['name']
            }
        ],
        attributes: ['id', 'name']
    });
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
        return;
    }
    // console.log( product );
    res.json(product);
});
exports.getProductId = getProductId;
// export const getProductsName = async( req: Request, res: Response ) => {
//     const { search } = req.query;
//     const products = await Product.findAll({
//         where: {
//             // [Op.and]: [
//             //     {
//             //         state: true
//             //     }
//             // ],
//             state: true,
//             name: {
//                 [Op.like]: `%${search}%`
//             }
//         }
//     });
//     if( products.length === 0 ){
//         res.status(404).json({
//             msg: `No hay productos que coincidan con su búsqueda`
//         });
//         return;
//     }
//     res.json( products );
// }
const updateProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { id: idProd, state, createdAt, updatedAt } = _a, productRest = __rest(_a, ["id", "state", "createdAt", "updatedAt"]);
    try {
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
            return;
        }
        if (productRest.name) {
            const nameExists = yield product_1.default.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { name: productRest.name },
                        { id: !id }
                    ]
                }
            });
            if (nameExists) {
                res.status(400).json({
                    msg: `Ya existe un producto con el nombre ${productRest.name}`
                });
                return;
            }
        }
        if (productRest.barcode) {
            const barcodeExists = yield product_1.default.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { barcode: productRest.barcode },
                        { id: !id }
                    ]
                }
            });
            if (barcodeExists) {
                res.status(400).json({
                    msg: `Ya existe un producto con el código ${productRest.barcode}`
                });
                return;
            }
        }
        if (productRest.price) {
            if (productRest.price <= 0) {
                res.status(400).json({
                    msg: 'El precio no puede ser menor o igual a 0'
                });
                return;
            }
        }
        if (productRest.providerId) {
            const providerExists = yield provider_1.default.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { id: productRest.providerId },
                        { state: true }
                    ]
                }
            });
            if (!providerExists) {
                res.status(400).json({
                    msg: `No existe un proveedor con el id ${productRest.providerId}`
                });
                return;
            }
        }
        if (productRest.categoryId) {
            const categoryExists = yield category_1.default.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { id: productRest.categoryId },
                        { state: true }
                    ]
                }
            });
            if (!categoryExists) {
                res.status(400).json({
                    msg: `No existe una categoría con el id ${productRest.categoryId}`
                });
                return;
            }
        }
        yield product.update(productRest);
        // TODO: Verificar que el proveedor exista
        res.json({
            msg: `Producto actualizado`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.updateProductId = updateProductId;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { id, state } = _b, productRest = __rest(_b, ["id", "state"]);
    // console.log( req );
    // console.log( productRest );
    delete productRest.state;
    try {
        // Verificar que el nombre del producto no exista
        const nameExists = yield product_1.default.findOne({
            where: {
                name: productRest.name
            }
        });
        if (nameExists) {
            res.status(400).json({
                msg: `Ya existe un producto con el nombre ${productRest.name}`
            });
            return;
        }
        // Verificar que el código de barras sea único
        const barcodeExists = yield product_1.default.findOne({
            where: {
                barCode: productRest.barcode
            }
        });
        // Error por si existe el código de barras
        if (barcodeExists) {
            res.status(400).json({
                msg: `Ya existe un producto con el código de barras ${productRest.barcode}`
            });
            return;
        }
        productRest.userId = req.user;
        // TODO: Validaciones para comprobar que el id del proveedor existe.
        const providerExists = yield provider_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id: productRest.providerId },
                    { state: true }
                ]
            }
        });
        if (!providerExists) {
            res.status(400).json({
                msg: `No existe un proveedor con el id ${productRest.providerId}`
            });
            return;
        }
        // TODO: Validaciones para comprobar que el id de la categoría existe.
        const categoryExists = yield category_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id: productRest.categoryId },
                    { state: true }
                ]
            }
        });
        if (!categoryExists) {
            res.status(400).json({
                msg: `No existe una categoría con el id ${productRest.categoryId}`
            });
            return;
        }
        const minStock = productRest.stock;
        if (minStock < 0) {
            res.status(400).json({
                msg: `La cantidad tiene que ser mayor a 0`
            });
            return;
        }
        const minPrice = productRest.price;
        if (minPrice <= 0) {
            res.status(400).json({
                msg: `El precio  no puede ser negativo.`
            });
            return;
        }
        const newProduct = yield product_1.default.create(productRest);
        res.status(201).json(newProduct);
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
    console.log(id);
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
        return;
    }
    // Eliminación lógica
    yield product.update({ state: false });
    res.json({
        msg: 'Producto eliminado'
    });
});
exports.deleteProductId = deleteProductId;
//# sourceMappingURL=product.js.map