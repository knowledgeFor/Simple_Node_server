import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';

const router = Router();

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUser);
router.post('/', userCtrl.createUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

export default router;
