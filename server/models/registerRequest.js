const mongoose = require("mongoose");
const registerRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, unique: true, required: true },
  yearOfRegistration: { type: String, required: true },
  specialization: { type: String, required: true },
  stateMedicalCouncil: { type: String, required: true },
  password: { type: String, required: true }

});
module.exports = mongoose.model("registerRequest", registerRequestSchema);