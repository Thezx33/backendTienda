"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const category_1 = require("../controllers/category");
const category_2 = require("../controllers/category");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', category_2.getCategories);
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name', 'La categoría es obligatoria').not().isEmpty(),
    validate_fields_1.validateFields
], category_2.createCategory);
router.put('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.categoryExists),
    (0, express_validator_1.check)('name', 'La categoría es obligatoria').not().isEmpty(),
    validate_fields_1.validateFields
], category_1.updateCategory);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.categoryExists),
    validate_fields_1.validateFields
], category_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.js.map