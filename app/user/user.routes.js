import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getOneProfile, getUserProfile } from "./user.controller.js";

// localhost:4200/api 
const router = express.Router();


// router.route('/profile').get(getUserProfile);

// router.route('/profile').get(protect, getUserProfile);
router.route('/profile').get(protect, getUserProfile);

router.route(`/profile/:id`).get(protect, getOneProfile);


export default router;
