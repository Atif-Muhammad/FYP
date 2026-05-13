import express from "express"
import { getAwards } from "../../controllers/awards.controller.js";
const router = express.Router()

router.get("/all", getAwards);

export default router;


