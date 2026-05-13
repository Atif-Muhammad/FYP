import { createAdmin, findUserbyEmail } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json("Missing Required field(s)");
    }

    // find if already exists
    const adminExists = await findUserbyEmail(email);
    if (adminExists) return res.status(409).send("Email taken");

    const rounds = 15;
    const hashed = await bcrypt.hash(password, rounds);

    const createdAdmin = await createAdmin({
      email,
      password: hashed,
    });
    if (!createdAdmin) return res.status(500).send("Unknow error");
    // create auth token
    const token = jwt.sign(
      {
        id: createdAdmin?._id,
        email: createdAdmin?.email,
      },
      process.env.SECRET_KEY,
      { algorithm: "HS256", expiresIn: process.env.JWT_EXP }
    );
    if (!token) return res.status(500).send("Unknown error");

    res
      .cookie("FYP", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({ success: true, data: email });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json("Missing Required field(s)");
    }

    // find admin dets
    const existing = await findUserbyEmail(email);
    if (!existing)
      return res
        .status(404)
        .send("Email not found -- try creating account first");

    const match = bcrypt.compareSync(password, existing?.password);
    if (!match) return res.status(401).send("Invalid Creds / Unauthorized");

    // resend cookie
    const token = jwt.sign(
      {
        id: existing?._id,
        email: existing?.email,
      },
      process.env.SECRET_KEY,
      { algorithm: "HS256", expiresIn: process.env.JWT_EXP }
    );
    if (!token) return res.status(500).send("Unknown error");

    res
      .cookie("FYP", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .send({ success: true, data: existing?.email });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

export const userWho = async (req, res) => {
  try {
    const fypCookie = req.cookies?.FYP;
    if (!fypCookie) return res.status(401).send("Bad Request / Unauthorized");
    const secret_key = process.env.SECRET_KEY;
    jwt.verify(fypCookie, secret_key, async (err, decoded) => {
      if (err) return res.status(400).send(`${err.message}--Re-directing to login page`);
      // check decode email in admin doc
      const authrized = await findUserbyEmail(decoded?.email);
      if (!authrized) return res.status(401).send("Un-Authorized to access this route");
      res.status(200).send("User Valid")
    });
  } catch (error) {
    res.status(500).send({ cause: error.message });
  }
};
