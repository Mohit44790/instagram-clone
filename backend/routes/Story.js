// routes/stories.js
const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// Get all stories
router.get("/stories", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new story
router.post("/stories", async (req, res) => {
  const { image, name } = req.body;

  try {
    const newStory = new Story({ image, name });
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
