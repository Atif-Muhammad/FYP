import jwt from "jsonwebtoken";
import { findUserbyEmail } from "../services/auth.service.js";

export const authAdmin = async (req, res, next) => {
    try {
        const fypCookie = req.cookies?.FYP;
        if (!fypCookie) return res.status(401).send("Bad Request / Unauthorized");
        const secret_key = process.env.SECRET_KEY;
        jwt.verify(fypCookie, secret_key, async (err, decoded) => {
            if (err) return res.send(`${err.message}--Re-directing to login page`);
            // check decode email in admin doc
            const authrized = await findUserbyEmail(decoded?.email);
            if (!authrized) return res.status(401).send("Un-Authorized to access this route");
            next();
        });
    } catch (error) {
        res.status(500).json({ cause: error.message });
    }
};
