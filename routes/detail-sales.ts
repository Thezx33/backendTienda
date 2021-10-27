import { validateFields } from './../middlewares/validate-fields';
import { validateJWT } from './../middlewares/validate-jwt';
import { Router } from 'express';
import { check } from 'express-validator';
import { saleExists } from '../helpers/db-validators';
import { createSale, getDetailSales, getSale } from '../controllers/detail-sales';

const router = Router();

router.get( '/',[
    validateJWT,
    validateFields
], getDetailSales );

router.get( '/:id',[
    validateJWT,
    check('id').custom( saleExists ),
    validateFields
], getSale );

router.post( '/',[
    validateJWT,
    validateFields
], createSale );

export default router;