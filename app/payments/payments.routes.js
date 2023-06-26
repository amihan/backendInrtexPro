import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getPayments } from "./payments.controller.js";


// localhost:4200/api 
const router = express.Router();


router.route('/:id/:idgroup').get(protect, getPayments);

export default router;