import express from "express"
import { allEvents } from "../../controllers/event.controller.js";
const router = express.Router()

router.get("/events", allEvents);

export default router;


