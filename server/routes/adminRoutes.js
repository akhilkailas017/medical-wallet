const express = require("express");
const router = express.Router();
const RegisterRequest = require("../models/registerRequest");
const Doctor = require("../models/doctors");


router.get("/doctor-enroll/:registrationNumber", async (req, res) => {
    try {
        const { registrationNumber } = req.params;
        const regReq = await RegisterRequest.findOne({ registrationNumber });
        if (!regReq) {
            return res.status(404).json({ error: "Registration request not found" });
        }
        const newDoctor = new Doctor({
            name: regReq.name,
            registrationNumber: regReq.registrationNumber,
            yearOfRegistration: regReq.yearOfRegistration,
            specialization: regReq.specialization,
            stateMedicalCouncil: regReq.stateMedicalCouncil,
            password: regReq.password,
        });
        await newDoctor.save();
        await RegisterRequest.findByIdAndDelete(regReq._id);
        res.status(200).json({ message: "Doctor enrolled successfully" });
    } catch (error) {
        console.error("Error enrolling doctor:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/doctors", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" });
        }
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/register-requests", async (req, res) => {
    try {
        const requests = await RegisterRequest.find();
        if (requests.length === 0) {
            return res.status(404).json({ message: "No registration requests found" });
        }
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching registration requests:", error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
