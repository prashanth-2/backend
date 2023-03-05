import express from 'express';
import * as UserController from '../controllers/userController';

const router = express.Router();

// User routes
router.get('/register', UserController.getUsers);

export default router;
