import { Router } from 'express';
import { check } from 'express-validator';
import { productExists } from './../helpers/db-validators';
import { validateJWT } from './../middlewares/validate-jwt';
import { validateFields } from './../middlewares/validate-fields';
import {
    getProducts,
    getProductId,
    // getProductsName,
    updateProductId,
    createProduct,
    deleteProductId
} from '../controllers/product';


const router = Router();


router.get('/', getProducts);

// router.get('/search', getProductsName);

router.get('/:id',[
    check('id').custom( productExists ),
    validateFields
], getProductId);

router.put('/:id',[
    validateJWT,
    check('id').custom( productExists ),
    validateFields
], updateProductId);

router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('barcode', 'El código de barras es obligatorio').not().isEmpty(),
    check('stock', 'La cantidad es necesaría').not().isEmpty(),
    validateFields
],createProduct);

router.delete('/:id',[
    validateJWT,
    check('id').custom( productExists ),
    validateFields
],deleteProductId);

export default router;