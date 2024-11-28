const express = require("express");
const router = express.Router();
// const Doctor=require("../models/doctors")
// const RegisterRequest=require("../models/registerRequest")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminsecret=process.env.adminsecret;

router.post("/admin-login", async (req, res) => {
    const { username, password } = req.body;
    if (username !== 'admin') {
        return res.status(401).json({ error: "Authentication failed" });
    }
    const adminpass = '$2a$10$vs0X45NtZet2dhTaT5DK4OprNwVTuO9aFF2Pn7CokMBl1n2VQ5cvW'
    const passwordMatch = await bcrypt.compare(password, adminpass);
    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ username: username }, adminsecret, { expiresIn: "1h" });
    res.cookie("AdminAuthToken", token,{
        httpOnly: true,
        secure: false,
    });

    res.json({ message: "Admin login successful" });
});



module.exports = router;