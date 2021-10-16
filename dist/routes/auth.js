"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validate_fields_1 = require("../middlewares/validate-fields");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'No es un correo válido').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validate_fields_1.validateFields
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map