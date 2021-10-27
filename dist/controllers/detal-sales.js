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
exports.createSale = exports.getSale = exports.getSales = void 0;
const sales_1 = __importDefault(require("../models/sales"));
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield sales_1.default.findAll({
            where: {
                state: true
            }
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
exports.getSales = getSales;
const getSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const sale = yield sales_1.default.findByPk(id);
        if (!sale) {
            res.status(404).json({
                msg: `No existe una venta con el id ${id}`
            });
            return;
        }
        res.status(200).json({ sale });
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
        console.log(restSale);
        const sale = yield sales_1.default.create(restSale);
        res.status(201).json({ sale });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.createSale = createSale;
//# sourceMappingURL=detal-sales.js.map