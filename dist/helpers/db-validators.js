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
exports.categoryExists = exports.productExists = exports.phoneExists = exports.providerExists = exports.emailProviderExists = exports.userExists = exports.emailUserExists = void 0;
const user_1 = __importDefault(require("../models/user"));
const provider_1 = __importDefault(require("../models/provider"));
const product_1 = __importDefault(require("../models/product"));
const category_1 = __importDefault(require("../models/category"));
const emailUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield user_1.default.findOne({
        where: {
            email
        }
    });
    if (emailExists) {
        throw new Error(`El correo ${email}, ya está registrado`);
    }
});
exports.emailUserExists = emailUserExists;
const userExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_1.default.findByPk(id);
    if (!userExists) {
        throw new Error(`El usuario con el id ${id} no existe`);
    }
});
exports.userExists = userExists;
const emailProviderExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield provider_1.default.findOne({
        where: {
            email
        }
    });
    if (emailExists) {
        throw new Error(`El correo ${email}, ya está registrado`);
    }
});
exports.emailProviderExists = emailProviderExists;
const providerExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const providerExists = yield provider_1.default.findByPk(id);
    if (!providerExists) {
        throw new Error(`El proveedor con el id ${id} no existe`);
    }
});
exports.providerExists = providerExists;
const phoneExists = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneExists = yield provider_1.default.findOne({
        where: {
            phone: phoneNumber
        }
    });
    if (phoneExists) {
        throw new Error(`El número ${phoneNumber} ya existe`);
    }
});
exports.phoneExists = phoneExists;
const productExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productExists = yield product_1.default.findByPk(id);
    if (!productExists) {
        throw new Error(`El producto con el id ${id} no existe`);
    }
});
exports.productExists = productExists;
const categoryExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryExits = yield category_1.default.findByPk(id);
    if (!exports.categoryExists) {
        throw new Error(`La categoría con el id ${id} no existe`);
    }
});
exports.categoryExists = categoryExists;
//# sourceMappingURL=db-validators.js.map