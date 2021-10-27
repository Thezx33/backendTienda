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
exports.createSale = exports.getSale = exports.getDetailSales = void 0;
const detail_sales_1 = __importDefault(require("../models/detail-sales"));
const product_1 = __importDefault(require("../models/product"));
const sales_1 = __importDefault(require("../models/sales"));
const user_1 = __importDefault(require("../models/user"));
const getDetailSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield detail_sales_1.default.findAll({
            include: [
                {
                    model: product_1.default,
                    attributes: ['id', 'name', 'price']
                },
                {
                    model: sales_1.default,
                    attributes: ['id'],
                    include: [
                        {
                            model: user_1.default,
                            attributes: ['name']
                        }
                    ]
                }
            ],
            attributes: ['quantity', 'unitPrice', 'createdAt']
        });
        if (sales.length === 0) {
            res.status(404).json({
                msg: 'No hay ventas'
            });
            return;
        }
        res.status(200).json({ sales });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getDetailSales = getDetailSales;
const getSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // const sales = await Sales.findAll( {
        //     where: {
        //         id
        //     }
        // } );
        const sales = yield detail_sales_1.default.findAll({
            where: {
                saleId: id
            },
            include: [
                {
                    model: product_1.default,
                    attributes: ['name', 'price']
                },
                {
                    model: sales_1.default,
                    attributes: ['total'],
                    include: [
                        {
                            model: user_1.default,
                            attributes: ['name']
                        }
                    ],
                }
            ],
            attributes: ['id', 'quantity', 'unitPrice']
        });
        if (sales.length === 0) {
            res.status(404).json({
                msg: `No existen ventas con el id ${id}`
            });
            return;
        }
        res.status(200).json({ sales });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getSale = getSale;
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state } = _a, restSale = __rest(_a, ["id", "state"]);
    try {
        let total = 0;
        // restSale.forEach( async ( sale: IDetailSales ) => {
        //     total += sale.quanitty * sale.priceArticle;
        // });
        // Obtener el total de las ventas
        for (const key in restSale) {
            total = restSale[key].quantity * restSale[key].unitPrice;
        }
        const sale = {
            total: total,
            userId: req.user
        };
        // Añadir el total a la tabla sales
        const newSale = yield sales_1.default.create(sale);
        // restSale.forEach( async ( sale: IDetailSales ) => {
        //     sale.idSale = newSale.id!;
        //     await DetailSales.create( sale );
        // });
        // Por cada producto hacer una inserción con el id de la venta
        for (const key in restSale) {
            restSale[key].saleId = newSale.id;
            yield detail_sales_1.default.create(restSale[key]);
        }
        res.status(201).json({ newSale });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.createSale = createSale;
//# sourceMappingURL=detail-sales.js.map