"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("./../helpers/db-validators");
const validate_jwt_1 = require("./../middlewares/validate-jwt");
const validate_fields_1 = require("./../middlewares/validate-fields");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.get('/', product_1.getProducts);
router.get('/search', product_1.getProductsName);
router.get('/:id', product_1.getProductId);
router.put('/:id', product_1.updateProductId);
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name').custom(db_validators_1.productExists),
    validate_fields_1.validateFields
], product_1.createProduct);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name').custom(db_validators_1.productExists),
    validate_fields_1.validateFields
], product_1.deleteProductId);
exports.default = router;
//# sourceMappingURL=product.js.map