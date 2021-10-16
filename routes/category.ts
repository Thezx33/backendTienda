import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { updateCategory, deleteCategory } from '../controllers/category';
import {
    getCategories,
    createCategory
} from '../controllers/category';

const router = Router();

router.get('/', getCategories);

router.post('/',[
    validateJWT,
    check('name', 'La categoría es obligatoria').not().isEmpty(),
    validateFields
], createCategory);

router.put('/:id', [
    validateJWT,
    check('name', 'La categoría es obligatoria').not().isEmpty(),
    validateFields    
],updateCategory);

router.delete('/:id',[
    validateJWT,
    validateFields
],deleteCategory);

export default router;