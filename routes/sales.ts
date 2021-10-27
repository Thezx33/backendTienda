import { validateFields } from './../middlewares/validate-fields';
import { validateJWT } from './../middlewares/validate-jwt';
import { Router } from 'express';
import { check } from 'express-validator';
import { saleExists } from '../helpers/db-validators';
import { getSale, getSales } from '../controllers/sales';

const router = Router();

router.get( '/',[
    validateJWT,
    validateFields
], getSales );

router.get( '/:id',[
    validateJWT,
    check('id').custom( saleExists ),
    validateFields
], getSale );

export default router;