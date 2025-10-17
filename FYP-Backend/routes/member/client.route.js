import express from "express"
import { allMembers } from "../../controllers/member.controller.js";
import { create, login, userWho } from "../../controllers/auth.controller.js";
const router = express.Router()



router.post("/auth/signup", create)
router.post("/auth/signin", login)
router.get("/auth/userWho", userWho)

router.get("/allMembers", allMembers)


export default router;

