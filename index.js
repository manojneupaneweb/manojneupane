import express from "express";
import path from "path";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import Admin from "./models/adminModel.js";
import connectDB from "./config/connectDB.js";
import sendMail from "./middlewares/sendMail.js";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.render('index', { name: 'Manoj Neupane' });
});

// app.get("/admin/datainsert", async (req, res) => {
//   const hashedPassword = await bcrypt.hash('Manoj@123', 12);
//   const admin = await Admin.create({
//     name:'Manoj Neuapne',
//     email: 'maanojneupane111@gmail.com',
//     password: hashedPassword,
//   })
//   res.json({ admin, message: "admin created" });
// });

app.get("/admin", async (req, res) => {
  const token = req.cookies.adminToken;
  const admin = await verifyToken(token);

  if (!admin) {
    return res.redirect("/admin/login"); 
  }

  res.render("adminpanel", { admin });
});

app.get("/admin/login", (req, res) => {
  res.render("login");
});

app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "admin email not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password is incorrect" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    await admin.save();

    const subject = "🔐 Admin Login OTP - Secure Your Account";

    const html = `
      <div style="font-family: Arial, sans-serif; padding:20px; background:#f9fafb; border-radius:8px;">
        <h2 style="color:#4f46e5;">Hi Manoj 👋</h2>
        <p>There was a login attempt to your Admin Panel.</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> (hidden for security)</p>
        <p>If this was you, here is your OTP code:</p>
        <h1 style="color:#dc2626; text-align:center;">${otp}</h1>
        <p>This OTP will expire in <b>5 minutes</b>. If this wasn’t you, please ignore this email.</p>
        <br>
        <p style="font-size:12px; color:#6b7280;">Secure Admin System © ${new Date().getFullYear()}</p>
      </div>
    `;

    const mailresponse = await sendMail({ subject, html });

    res.redirect("/admin/verify-otp");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/admin/verify-otp", async(req, res) => {

  const token = req.cookies.adminToken;
  const decoded =await verifyToken(token)
  if (decoded) {
    res.redirect("/admin");
  }
  res.render("verify-otp");
});

app.post("/admin/verify-otp", async (req, res) => {
  const { otp } = req.body;

  console.log('otp : ', otp);


  try {
    const admin = await Admin.findOne({ otp });

    if (!admin) {
      return res.send({ message: "OTP not match", success: false });
    }

    if (admin.otpExpiry < new Date()) {
      return res.send({ message: "OTP expired", success: false });
    }

    admin.otp = null;
    admin.otpExpiry = null;
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("adminToken", token, { httpOnly: true });

    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/admin/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/admin/login");
});

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  } catch (err) {
    return null;
  }
};


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
