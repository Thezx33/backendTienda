"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_jwt_1 = require("./../middlewares/validate-jwt");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const provider_1 = require("../controllers/provider");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.get('/', provider_1.getProviders);
// router.get('/search', getProvidersName);
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.providerExists),
    validate_fields_1.validateFields
], provider_1.getProviderId);
router.put('/:id', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('id').custom(db_validators_1.providerExists),
    validate_fields_1.validateFields
], provider_1.updateProviderId);
router.post('/', [
    validate_jwt_1.validateJWT,
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailProviderExists),
    (0, express_validator_1.check)('phone', 'El teléfono es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('phone', 'El teléfono debe de contener mínimo 10 caracteres y máximo 16').isLength({ min: 10, max: 16 }),
    (0, express_validator_1.check)('phone', 'No es un número de teléfono válido').isMobilePhone('es-MX'),
    (0, express_validator_1.check)('phone').custom(db_validators_1.phoneExists),
    validate_fields_1.validateFields
], provider_1.createProvider);
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.providerExists),
    validate_fields_1.validateFields
], provider_1.deleteProviderId);
exports.default = router;
//# sourceMappingURL=provider.js.map