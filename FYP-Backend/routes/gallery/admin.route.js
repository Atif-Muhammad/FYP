import express from "express"
import { addMedia, removeMedia, updateMedia } from "../../controllers/gallery.controller.js";
import { upload } from "../../multer/multer.config.js";
const router = express.Router()


router.post("/addGallery", upload.single("image"), addMedia);
router.patch("/updateGallery", upload.single("image"), updateMedia);
router.delete("/deleteGallery", removeMedia);



export default router;


