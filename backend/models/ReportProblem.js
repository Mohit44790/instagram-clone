const mongoose = require("mongoose");

// Define a Mongoose schema for the ProblemReport
const problemReportSchema = new mongoose.Schema({
  subject: String,
  description: String,
  email: String,
});

// Create a Mongoose model based on the schema
const ProblemReport = mongoose.model("ProblemReport", problemReportSchema);

module.exports = ProblemReport; // Export the ProblemReport model
