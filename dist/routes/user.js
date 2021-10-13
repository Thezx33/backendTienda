"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/', user_1.getUsers);
router.get('/search', user_1.getUsersName);
router.get('/:id', user_1.getUserId);
router.put('/:id', user_1.updateUserId);
router.post('/', user_1.createUser);
router.delete('/:id', user_1.deleteUserId);
exports.default = router;
//# sourceMappingURL=user.js.map