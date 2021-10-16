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
import { validateJWT } from '../middlewares/validate-jwt';


const router = Router();


router.get('/', getUsers);

router.get('/search', getUsersName);

router.get('/:id',[
    check('id').custom( userExists ),
    validateFields
], getUserId);

router.put('/:id',[
    check('id').custom( userExists ),
    validateFields
],updateUserId);

router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailUserExists ),
    validateFields
], createUser);

router.delete('/:id',[
    validateJWT,
    check('id').custom( userExists ),
    validateFields
], deleteUserId);

export default router;