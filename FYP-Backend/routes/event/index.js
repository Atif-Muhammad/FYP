import express from "express"
import adminRouter from "./admin.route.js"
import clientRouter from "./client.route.js"
import { authAdmin } from "../../middlewares/auth.middleware.js"

const router = express.Router()

router.use("/admin", authAdmin, adminRouter)
router.use("/client", clientRouter)

export default router;