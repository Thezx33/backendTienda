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
exports.deleteProviderId = exports.updateProviderId = exports.createProvider = exports.getProviderId = exports.getProviders = void 0;
const sequelize_1 = require("sequelize");
const provider_1 = __importDefault(require("../models/provider"));
const patternPhone = /(\(\d{3}\)[.-]?|\d{3}[.-]?)?\d{3}[.-]?\d{4}/;
const getProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providers = yield provider_1.default.findAll({
            where: { state: true },
            attributes: ['name', 'email', 'phone', 'createdAt', 'updatedAt']
        });
        if (providers.length === 0) {
            res.status(404).json({
                msg: `No hay proveedores registrados`
            });
            return;
        }
        res.status(200).json({ providers });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getProviders = getProviders;
const getProviderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const provider = yield provider_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { state: true },
                    { id }
                ]
            },
            attributes: ['name', 'email', 'phone', 'createdAt', 'updatedAt']
        });
        if (!provider) {
            res.status(400).json({
                msg: 'No hay un usuario con ese id'
            });
            return;
        }
        res.json({ provider });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getProviderId = getProviderId;
// export const getProvidersName = async ( req: Request, res: Response ) => {
//     const { name: query } = req.query;
//     const providers = await Provider.findAll({
//         where: {
//             state: true,
//             name: {
//                 [Op.like]: `%${ query }%`
//             }
//         }
//     });
//     if( providers.length === 0 ) {
//         res.status(404).json({
//             msg: `No hay proveedores que coincidan con ${ query }`
//         });
//         return;
//     }
//     res.json( providers );
// }
const createProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state, createdAt, updatedAt } = _a, providerRest = __rest(_a, ["id", "state", "createdAt", "updatedAt"]);
    try {
        const provider = yield provider_1.default.create(providerRest);
        res.status(201).json({ provider });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.createProvider = createProvider;
const updateProviderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { id: providerId, state, createdAt, updatedAt } = _b, providerRest = __rest(_b, ["id", "state", "createdAt", "updatedAt"]);
    try {
        if (providerRest.email) {
            const emailExists = yield provider_1.default.findOne({
                where: {
                    email: providerRest.email
                }
            });
            if (emailExists) {
                res.status(400).json({
                    msg: `El correo ${providerRest.email} ya existe`
                });
                return;
            }
        }
        if (providerRest.phone) {
            if (providerRest.phone.length < 10 || providerRest.phone.length > 16) {
                res.status(400).json({
                    msg: 'El teléfono tiene que tener mínimo 10 caracteres y máximo 18'
                });
                return;
            }
            // if (providerRest.phone.length > 16 ){
            //     res.status(400).json({
            //         msg: 'El teléfono tiene que tener máximo 16 caracteres'
            //     });
            //     return;
            // }
            const phonePattern = new RegExp(patternPhone, 'g');
            if (!phonePattern.test(providerRest.phone)) {
                res.status(400).json({
                    msg: 'El formato del teléfono no es válido'
                });
                return;
            }
            const phoneExists = yield provider_1.default.findOne({
                where: {
                    phone: providerRest.phone
                }
            });
            if (phoneExists) {
                res.status(400).json({
                    msg: `El teléfono ${providerRest.phone} ya existe`
                });
                return;
            }
        }
        yield provider_1.default.update(providerRest, {
            where: {
                id
            }
        });
        res.json({
            msg: `Proveedor actualizado`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.updateProviderId = updateProviderId;
const deleteProviderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield provider_1.default.update({ state: false }, { where: { id } });
        res.status(200).json({
            msg: `Proveedor eliminado`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.deleteProviderId = deleteProviderId;
//# sourceMappingURL=provider.js.map