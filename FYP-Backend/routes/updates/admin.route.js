import express from "express"
import { upload } from "../../multer/multer.config.js";
import { addUpdate, deleteUpdate, editUpdate } from "../../controllers/updates.controller.js";
const router = express.Router();


router.post("/addUpdate", upload.single("image"), addUpdate)
router.patch("/editUpdate", upload.single("image"), editUpdate)
router.delete("/deleteUpdate", deleteUpdate)


export default router;