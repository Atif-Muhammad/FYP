import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import memberRouter from "./routes/member/index.js"
import programRouter from "./routes/program/index.js"
import eventRouter from "./routes/event/index.js"
import galleryRouter from "./routes/gallery/index.js"
import updatesRouter from "./routes/updates/index.js"
import { homeController } from "./controllers/home.controller.js"
import achieveRouter from "./routes/achieve/index.js"
import awardRouter from "./routes/award/index.js"

const allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    'https://fyp-mu-smoky.vercel.app',
    'https://fyp-azure-omega.vercel.app'
]

const app = express();
app.set("trust proxy", 1);
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowed_origins.includes(origin)) {
                return callback(null, true);
            }
            return callback(null, false);
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],

    })
)

app.get("/apis/home", homeController)


app.use("/apis/members", memberRouter);
app.use("/apis/dashboard", memberRouter)
app.use("/apis/programs", programRouter);
app.use("/apis/events", eventRouter);
app.use("/apis/gallery", galleryRouter)
app.use("/apis/updates", updatesRouter)
app.use("/apis/achievements", achieveRouter)
app.use("/apis/awards", awardRouter)


app.get("/ping", (req, res) => {
    res.send("pong");
})

app.get("/apis/logout", (req, res) => {
    res.clearCookie("FYP", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        path: "/",
    });
    return res.status(200).json({ success: true });
});

const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL

mongoose.connect(mongo_url).then(res => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server is Running on Port ${port}`);
    })
}).catch(err => {
    console.log(err);
})