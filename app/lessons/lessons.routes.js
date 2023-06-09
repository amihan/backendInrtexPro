import express from "express";
import { protect } from '../middleware/auth.middleware.js';
import { getCourse, getOneCousrse } from './lessons.controller.js';


// localhost:4200/api 
const router = express.Router();

router.route('/:id').get(getCourse);
router.route('/lesson/:id/:idgroup').get(getOneCousrse);

export default router;