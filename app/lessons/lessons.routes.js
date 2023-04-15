import express from "express";
import { protect } from '../middleware/auth.middleware.js';
import { getLessons } from './lessons.controller.js';


// localhost:4200/api 
const router = express.Router();

router.route('/:id').get(protect, getLessons);

export default router;