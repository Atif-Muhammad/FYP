import express from "express"
import { gallery } from "../../controllers/gallery.controller.js";
const router = express.Router()


router.get("/gallery", gallery);

export default router;


