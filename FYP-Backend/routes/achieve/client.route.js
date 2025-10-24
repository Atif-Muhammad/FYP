import express from "express"
import { getAchieves } from "../../controllers/achievements.controller.js";
const router = express.Router()

router.get("/all", getAchieves);

export default router;


