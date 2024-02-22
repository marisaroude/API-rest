import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser } from '../controllers/index.controllers'
import { authenticateToken } from '../middlewares/authMiddleware';
const router = Router();

router.post('/api/v1/users/login',loginUser); 
router.get('/api/v1/users', getUsers); 
router.get('/api/v1/users/:id', authenticateToken, getUser);
router.post('/api/v1/users', authenticateToken, createUser); 
router.put('/api/v1/users/:id',authenticateToken,  updateUser);
router.delete('/api/v1/users/:id',authenticateToken, deleteUser); 

export default router;