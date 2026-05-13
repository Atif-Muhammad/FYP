import express from "express"
import { addEvent, removeEvent, updateEvent } from "../../controllers/event.controller.js";
import {upload} from "../../multer/multer.config.js"
const router = express.Router()

router.post("/addEvent", upload.single("image"), addEvent);
router.patch("/updateEvent", upload.single("image"), updateEvent);
router.delete("/deleteEvent", removeEvent);

export default router;


