import express from "express"
import { allMembers } from "../../controllers/member.controller.js";
import { create, login, userWho } from "../../controllers/auth.controller.js";
import { allExecs } from "../../controllers/exective.controller.js";
const router = express.Router()



router.post("/auth/signup", create)
router.post("/auth/signin", login)
router.get("/auth/userWho", userWho)

router.get("/allMembers", allMembers)

router.get("/allExecs", allExecs)


export default router;

