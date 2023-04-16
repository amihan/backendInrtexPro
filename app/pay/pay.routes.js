import express from "express";
import { getPayMonths } from "./pay.controller.js";
import { protect } from '../middleware/auth.middleware.js';


// localhost:4200/api 
const router = express.Router();

router.route('/:id/:idgroup').get(getPayMonths);

export default router;