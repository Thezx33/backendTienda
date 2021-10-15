"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const validate_fields_1 = require("../middlewares/validate-fields");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', user_1.getUsers);
router.get('/search', user_1.getUsersName);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.userExists),
    validate_fields_1.validateFields
], user_1.getUserId);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.userExists),
    validate_fields_1.validateFields
], user_1.updateUserId);
router.post('/', [
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailUserExists),
    validate_fields_1.validateFields
], user_1.createUser);
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.userExists),
    validate_fields_1.validateFields
], user_1.deleteUserId);
exports.default = router;
//# sourceMappingURL=user.js.map