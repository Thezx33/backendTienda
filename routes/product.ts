import { Router } from 'express';
import { check } from 'express-validator';
import { productExists } from './../helpers/db-validators';
import { validateJWT } from './../middlewares/validate-jwt';
import { validateFields } from './../middlewares/validate-fields';
import {
    getProducts,
    getProductId,
    getProductsName,
    updateProductId,
    createProduct,
    deleteProductId
} from '../controllers/product';


const router = Router();


router.get('/', getProducts);

router.get('/search', getProductsName);

router.get('/:id', getProductId);

router.put('/:id', updateProductId);

router.post('/',[
    validateJWT,
    check('name').custom( productExists ),
    validateFields
],createProduct);

router.delete('/:id',[
    validateJWT,
    check('name').custom( productExists ),
    validateFields
],deleteProductId);

export default router;