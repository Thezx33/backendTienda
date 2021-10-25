import { validateJWT } from './../middlewares/validate-jwt';
import { Router } from 'express';
import { check } from 'express-validator';
import {
    getUsers,
    getUsersName,
    getUserId,
    updateUserId,
    createUser,
    deleteUserId
} from '../controllers/user';

import { validateFields } from '../middlewares/validate-fields';
import { emailUserExists, userExists } from '../helpers/db-validators';


const router = Router();


router.get('/', getUsers);

// router.get('/search', getUsersName);

router.get('/:id',[
    check('id').custom( userExists ),
    validateFields
], getUserId);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailUserExists ),
    check('password', 'La contraseña es obligatoría').not().isEmpty(),
    check('password', 'La contraseña tiene que tener un mínimo de 6 caracteres').isLength({ min: 6 }),
    validateFields
], createUser);

router.put('/:id',[
    validateJWT,
    check('id').custom( userExists ),
    validateFields
],updateUserId);

router.delete('/:id',[
    validateJWT,
    check('id').custom( userExists ),
    validateFields
], deleteUserId);

export default router;