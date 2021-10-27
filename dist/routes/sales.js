"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_fields_1 = require("./../middlewares/validate-fields");
const validate_jwt_1 = require("./../middlewares/validate-jwt");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const sales_1 = require("../controllers/sales");
const router = (0, express_1.Router)();
router.get('/', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], sales_1.getSales);
router.get('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.saleExists),
    validate_fields_1.validateFields
], sales_1.getSale);
exports.default = router;
//# sourceMappingURL=sales.js.map