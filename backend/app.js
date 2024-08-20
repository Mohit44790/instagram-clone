require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Import Models
require("./models/model");
require("./models/post");
require("./models/message");
require("./models/Story");

// Import Routes
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));
app.use(require("./routes/messages"));
app.use(require("./routes/Story"));

// MongoDB Connection
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
