import { validateJWT } from './../middlewares/validate-jwt';
import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import {
    getProviders,
    getProviderId,
    updateProviderId,
    createProvider,
    deleteProviderId
} from '../controllers/provider';
import { providerExists, emailProviderExists, phoneExists } from '../helpers/db-validators';

const router = Router();

router.get('/', getProviders);

// router.get('/search', getProvidersName);

router.get('/:id', [
    check('id').custom( providerExists ),
    validateFields
], getProviderId);

router.put('/:id', [
    validateJWT,
    check('id').custom( providerExists ),
    validateFields
], updateProviderId);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailProviderExists ),
    check('phone', 'El teléfono es obligatorio').not().isEmpty(),
    check('phone', 'El teléfono debe de contener mínimo 10 caracteres y máximo 16').isLength({min: 10, max: 16}),
    check('phone', 'No es un número de teléfono válido').isMobilePhone('es-MX'),
    check('phone').custom( phoneExists ),
    validateFields
], createProvider);

router.delete('/:id', [
    check('id').custom( providerExists ),
    validateFields
], deleteProviderId);

export default router;