import express from "express"
import {upload} from "../../multer/multer.config.js"
import { createAchieve, deleteAchieve, updateAchieve } from "../../controllers/achievements.controller.js";
const router = express.Router()

router.post("/addAchievement", upload.single("image"), createAchieve);
router.patch("/updateAchievement", upload.single("image"), updateAchieve);
router.delete("/deleteAchievement", deleteAchieve);

export default router;


