import express from "express"
import { program, programs } from "../../controllers/program.controller.js";
const router = express.Router();

router.get("/allPrograms", programs);
router.get("/program", program);


export default router;