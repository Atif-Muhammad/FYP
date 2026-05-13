import express from "express"
import { upload } from "../../multer/multer.config.js";
import { addProgram, deleteProgram, updateProgram } from "../../controllers/program.controller.js";
const router = express.Router();


router.post("/addProgram", upload.single("image"), addProgram)
router.patch("/updateProgram", upload.single("image"), updateProgram)
router.delete("/deleteProgram", deleteProgram)



export default router;