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
exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar si el email existe
        const user = yield user_1.default.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(200).json({
                msg: `Usuario / password no son correctos - email`
            });
        }
        const userPassword = user.get('password');
        const userId = user.get('id');
        // Verificar si el usuarios esta activo
        if (!user.get('state')) {
            return res.status(200).json({
                msg: `Usuario / password no son correctos - password`
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, userPassword);
        if (!validPassword) {
            return res.status(400).json({
                msg: `Usuario / Password no son correctos - password`
            });
        }
        // Generar JWT
        const token = yield (0, generar_jwt_1.generateJWT)(userId);
        res.json({
            msg: 'Logueado',
            email: user.email,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map