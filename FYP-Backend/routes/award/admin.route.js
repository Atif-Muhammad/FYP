import express from "express"
import {upload} from "../../multer/multer.config.js"
import { createAward, deleteAward, updateAward } from "../../controllers/awards.controller.js";
const router = express.Router()

router.post("/createAward", upload.single("image"), createAward);
router.patch("/updateAward", upload.single("image"), updateAward);
router.delete("/deleteAward", deleteAward);

export default router;


