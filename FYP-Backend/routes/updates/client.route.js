import express from "express"
import { updates } from "../../controllers/updates.controller.js";
const router = express.Router();

router.get("/updates", updates);


export default router;