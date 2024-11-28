const express = require("express");
const router = express.Router();
const Doctor=require("../models/doctors")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersecret=process.env.usersecret;


router.post("/doctor-register", async (req, res) => {
  try {
   const { name,registrationNumber,yearOfRegistration,specialization,stateMedicalCouncil,password }=req.body;
   const hashedPassword = await bcrypt.hash(password, 10);
   const doctor = new Doctor({name,registrationNumber,yearOfRegistration,specialization,stateMedicalCouncil,password:hashedPassword});
   await doctor.save();
    res.status(201).json({ message: "doctor registered successfully" });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/doctor-login", async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    const doctor = await Doctor.findOne({ registrationNumber });
    if (!doctor) {
      return res
        .status(401)
        .json({ error: "Authentication failed- Doctor doesn't exists" });
    }
    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed- password doesn't match" });
    }
    const token = jwt.sign(
      { doctorId: doctor._id, registrationNumber: doctor.registrationNumber },
      usersecret ,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("doctorToken", token, {
        httpOnly: true,
        secure: false, 
      });
    res.json({
      status: true,
      message: "login success",
      token,
      registrationNumber: doctor.registrationNumber,
      doctorId: doctor._id
    });
    return res;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("doctorToken");
  res.status(200).send("Logout successful");
  return res;
});

module.exports = router;