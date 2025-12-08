import {login, getReports} from '../Controllers/authController.js';
import {checkAuth} from '../middlewares/authMiddleware.js';
import express from 'express';

const router = express.Router();


router.post("/login", login);
router.get("/reports", checkAuth, getReports);

export default router;