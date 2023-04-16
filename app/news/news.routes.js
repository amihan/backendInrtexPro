import express from "express";
import { getNews } from "./news.controller.js";
import { protect } from './../middleware/auth.middleware.js';


// localhost:4200/api 
const router = express.Router();


router.route('/').get(getNews);

export default router;