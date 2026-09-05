import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { rateLimiter } from '../helpers/authHelper';

const router = Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', rateLimiter(), loginUser);

export default router;
