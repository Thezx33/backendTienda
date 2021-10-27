"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_fields_1 = require("./../middlewares/validate-fields");
const validate_jwt_1 = require("./../middlewares/validate-jwt");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const detail_sales_1 = require("../controllers/detail-sales");
const router = (0, express_1.Router)();
router.get('/', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], detail_sales_1.getDetailSales);
router.get('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.saleExists),
    validate_fields_1.validateFields
], detail_sales_1.getSale);
router.post('/', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], detail_sales_1.createSale);
exports.default = router;
//# sourceMappingURL=detail-sales.js.map