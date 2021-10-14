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
import { emailExists } from '../helpers/db-validators';


const router = Router();


router.get('/', getUsers);

router.get('/search', getUsersName);

router.get('/:id', getUserId);

router.put('/:id', updateUserId);

router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExists ),
    validateFields
], createUser);

router.delete('/:id', deleteUserId);

export default router;