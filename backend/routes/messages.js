const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const ProblemReport = require("../models/ReportProblem");

// Create a new message
router.post("/messages", async (req, res) => {
  const { text, sender } = req.body;

  try {
    const message = new Message({ text, sender });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/api/report-problem", (req, res) => {
  const { subject, description, email } = req.body;

  const problemReport = new ProblemReport({
    subject,
    description,
    email,
  });

  problemReport
    .save()
    .then(() => {
      res.json({ message: "Problem report submitted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error submitting the report: " + error });
    });
});

module.exports = router;
