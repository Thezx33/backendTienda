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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const sequelize_1 = require("sequelize");
const category_1 = __importDefault(require("../models/category"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.findAll({
            where: {
                state: true
            },
            attributes: ['id', 'name', 'createdAt']
        });
        if (categories.length === 0) {
            res.status(404).json({
                msg: 'No hay categorias'
            });
            return;
        }
        res.status(200).json({ categories });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getCategories = getCategories;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state } = _a, restCategory = __rest(_a, ["id", "state"]);
    try {
        restCategory.name = restCategory.name.toUpperCase();
        const nameExists = yield category_1.default.findOne({
            where: {
                name: restCategory.name
            }
        });
        if (nameExists) {
            res.status(400).json({
                msg: `La categor??a ${restCategory.name} ya existe`
            });
            return;
        }
        const category = yield category_1.default.create(restCategory);
        res.status(201).json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { id: bodyId, state } = _b, restCategory = __rest(_b, ["id", "state"]);
    try {
        const category = yield category_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id },
                    { state: true }
                ]
            }
        });
        if (!category) {
            res.status(404).json({
                msg: `La categor??a con el id ${id} no existe`
            });
            return;
        }
        const existsCategory = yield category_1.default.findOne({
            where: {
                name: restCategory.name
            }
        });
        if (existsCategory) {
            res.status(400).json({
                msg: `La categor??a ${restCategory.name}, ya existe`
            });
            return;
        }
        restCategory.name = restCategory.name.toUpperCase();
        yield category.update(restCategory);
        res.status(200).json({
            msg: 'Categor??a actualizada'
        });
    }
    catch (error) {
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield category_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { id },
                { state: true }
            ]
        }
    });
    if (!category) {
        res.status(404).json({
            msg: `La categor??a con el id ${id} no existe`
        });
        return;
    }
    yield category.update({ state: false });
    res.json({
        msg: 'Categor??a eliminada'
    });
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.js.map