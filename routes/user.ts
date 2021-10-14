import { Router } from 'express';
import {
    getUsers,
    getUsersName,
    getUserId,
    updateUserId,
    createUser,
    deleteUserId
} from '../controllers/user';



const router = Router();


router.get('/', getUsers);

router.get('/search', getUsersName);

router.get('/:id', getUserId);

router.put('/:id', updateUserId);

router.post('/', createUser);

router.delete('/:id', deleteUserId);

export default router;