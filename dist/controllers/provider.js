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
exports.deleteProviderId = exports.updateProviderId = exports.createProvider = exports.getProvidersName = exports.getProviderId = exports.getProviders = void 0;
const sequelize_1 = require("sequelize");
const provider_1 = __importDefault(require("../models/provider"));
const pattern = /(\(\d{3}\)[.-]?|\d{3}[.-]?)?\d{3}[.-]?\d{4}/;
const getProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providers = yield provider_1.default.findAll({
        where: { state: true }
    });
    if (providers.length === 0) {
        res.status(404).json({
            msg: `No hay proveedores registrados`
        });
        return;
    }
    res.json(providers);
});
exports.getProviders = getProviders;
const getProviderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let provider = yield provider_1.default.findByPk(id);
    if (!provider) {
        res.status(400).json({
            msg: 'No hay un usuario con ese id'
        });
        return;
    }
    res.json(provider);
});
exports.getProviderId = getProviderId;
const getProvidersName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: query } = req.query;
    const providers = yield provider_1.default.findAll({
        where: {
            state: true,
            name: {
                [sequelize_1.Op.like]: `%${query}%`
            }
        }
    });
    if (providers.length === 0) {
        res.status(404).json({
            msg: `No hay proveedores que coincidan con ${query}`
        });
        return;
    }
    res.json(providers);
});
exports.getProvidersName = getProvidersName;
const createProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state, createdAt, updatedAt } = _a, providerRest = __rest(_a, ["id", "state", "createdAt", "updatedAt"]);
    const provider = yield provider_1.default.create(providerRest);
    res.json(provider);
});
exports.createProvider = createProvider;
const updateProviderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { id: providerId, state, createdAt, updatedAt } = _b, providerRest = __rest(_b, ["id", "state", "createdAt", "updatedAt"]);
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
        if (providerRest.phone.length < 10) {
            res.status(400).json({
                msg: 'El teléfono tiene que tener mínimo 10 caracteres'
            });
            return;
        }
        if (providerRest.phone.length > 16) {
            res.status(400).json({
                msg: 'El teléfono tiene que tener máximo 16 caracteres'
            });
            return;
        }
        const phonePattern = new RegExp(pattern, 'g');
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
});
exports.updateProviderId = updateProviderId;
const deleteProviderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield provider_1.default.update({ state: false }, { where: { id } });
    res.json({
        msg: `Proveedor eliminado`
    });
});
exports.deleteProviderId = deleteProviderId;
//# sourceMappingURL=provider.js.map