const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/authMiddleware');
const Complaint = require('../models/Complaint');
const mongoose = require('mongoose');


router.get('/offer', verifyToken, async (req, res) => {
  try {
    const details = await Ride.find({});
    res.json(details);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json('Server error');
  }
});

router.post('/offer', verifyToken, async (req, res) => {
  try {
    const data = req.body;
    const result = await Ride.create(data);
    res.status(201).json('Offer created successfully');
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json('Server error');
  }
});



module.exports = router;