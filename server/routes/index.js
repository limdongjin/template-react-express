import express from 'express';
import nuser from './nuser';

const router = express.Router();
router.use('/users', nuser);

export default router;
