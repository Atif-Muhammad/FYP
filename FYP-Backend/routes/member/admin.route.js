import express from "express"
import { addMember, deleteMember, updateMember } from "../../controllers/member.controller.js";
import { upload } from "../../multer/multer.config.js";
import { dashboard } from "../../controllers/dashboard.controller.js";
const router = express.Router()

router.post("/addMember", upload.single("image"), addMember);
router.patch("/updateMember", upload.single("image"), updateMember);
router.delete("/deleteMember", deleteMember);
router.get("/dashboard", dashboard);

export default router;


