
import express from "express";
import { authUser, refresh, registerUser } from "./auth.controller.js";

// localhost:4200/api 

const router = express.Router();

router.route('/login').post(authUser);
router.route('/register').post(registerUser);
router.route('/refresh').post(refresh);


export default router;
