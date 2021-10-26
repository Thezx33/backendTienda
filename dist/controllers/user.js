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
exports.deleteUserId = exports.updateUserId = exports.createUser = exports.getUserId = exports.getUsers = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Encontrar a todos los usuarios que esten activos
        const users = yield user_1.default.findAll({
            where: { state: true },
            attributes: [
                'id',
                'name',
                'email',
                'createdAt',
                'updatedAt'
            ]
        });
        if (users.length === 0) {
            res.status(404).json({
                msg: `No hay usuarios registrados`
            });
            return;
        }
        res.status(200).json({ users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getUsers = getUsers;
const getUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Obtener al usuario con el id y con el estado en true.
        const user = yield user_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id },
                    { state: true }
                ]
            },
            attributes: [
                'id',
                'name',
                'email',
                'createdAt',
                'updatedAt'
            ]
        });
        res.status(200).json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getUserId = getUserId;
// export const getUsersName = async ( req: Request, res: Response ) => {
//     const { name: query } = req.query;
//     const users = await User.findAll({
//         where: {
//             // [Op.and]: [
//             //     { state: true }
//             // ],
//             state: true,
//             name: {
//                 [Op.like]: `%${ query }%`
//             }
//         }
//     });
//     if( users.length === 0 ){
//         res.status(404).json({
//             msg: `No hay usuarios que coincidan con su búsqueda`
//         });
//         return;
//     }
//     res.json( users );
// }
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state } = _a, userRest = __rest(_a, ["id", "state"]);
    try {
        // Encriptar contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        userRest.password = bcryptjs_1.default.hashSync(userRest.password, salt);
        const user = yield user_1.default.create(userRest);
        res.status(201).json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el adminsitrador'
        });
    }
});
exports.createUser = createUser;
const updateUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { id: userId, state } = _b, userRest = __rest(_b, ["id", "state"]);
    try {
        // Verificar si el usuario existe | state = true
        const userExists = yield user_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { id },
                    { state: true }
                ]
            }
        });
        if (!userExists) {
            res.status(400).json({
                msg: `El usuario con el id ${id} está eliminado`
            });
            return;
        }
        // Verifica si viene el correo
        if (userRest.email) {
            // Buscar si el correo ya esta registrado
            const emailExists = yield user_1.default.findOne({
                where: {
                    email: userRest.email
                }
            });
            // Si el correo ya está registrado manda un error
            if (emailExists) {
                res.status(400).json({
                    msg: `El correo ${userRest.email} ya está registrado`
                });
                return;
            }
        }
        // Verifica si viene la contraseña
        if (userRest.password) {
            // Encriptar la contraseña
            const salt = bcryptjs_1.default.genSaltSync();
            userRest.password = bcryptjs_1.default.hashSync(userRest.password, salt);
        }
        // Actualizar la información del usuario
        yield user_1.default.update(userRest, {
            where: { id }
        });
        res.json({
            msg: `Usuario actualizado`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.updateUserId = updateUserId;
const deleteUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield user_1.default.update({ state: false }, {
            where: { id }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    res.json({
        msg: `Usuario eliminado`
    });
});
exports.deleteUserId = deleteUserId;
//# sourceMappingURL=user.js.map