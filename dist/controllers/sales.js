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
exports.getSale = exports.getSales = void 0;
const sales_1 = __importDefault(require("../models/sales"));
const user_1 = __importDefault(require("../models/user"));
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sales = yield sales_1.default.findAll({
            include: [
                {
                    model: user_1.default,
                    attributes: ['name']
                }
            ],
            attributes: ['id', 'total']
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
        // const sales = await Sales.findAll( {
        //     where: {
        //         id
        //     }
        // } );
        const sales = yield sales_1.default.findAll({
            where: {
                id
            },
            include: [
                {
                    model: user_1.default,
                    attributes: ['name']
                }
            ],
            attributes: ['id', 'total', 'createdAt']
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
//# sourceMappingURL=sales.js.map