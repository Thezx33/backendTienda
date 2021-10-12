import { Router } from 'express';
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

router.post('/', createProduct);

router.delete('/:id', deleteProductId);

export default router;