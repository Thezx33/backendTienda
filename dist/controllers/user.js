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
exports.deleteUserId = exports.updateUserId = exports.createUser = exports.getUsersName = exports.getUserId = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'get User'
    });
});
exports.getUsers = getUsers;
const getUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'get User Id'
    });
});
exports.getUserId = getUserId;
const getUsersName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'get Users Names'
    });
});
exports.getUsersName = getUsersName;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id, state } = _a, userRest = __rest(_a, ["id", "state"]);
    // Encriptar contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    userRest.password = bcryptjs_1.default.hashSync(userRest.password, salt);
    const user = yield user_1.default.create(userRest);
    res.json(user);
});
exports.createUser = createUser;
const updateUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'update User Id'
    });
});
exports.updateUserId = updateUserId;
const deleteUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'delete User Id'
    });
});
exports.deleteUserId = deleteUserId;
//# sourceMappingURL=user.js.map