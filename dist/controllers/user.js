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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserId = exports.updateUserId = exports.createUser = exports.getUsersName = exports.getUserId = exports.getUsers = void 0;
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
    res.json({
        msg: 'user created'
    });
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