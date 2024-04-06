const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");

app.use(cors());
require("./models/model");
require("./models/post");
require("./models/message");
require("./models/Story");
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));
app.use(require("./routes/messages"));
app.use(require("./routes/Story"));

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("successfully connected to mongo");
});

mongoose.connection.on("error", () => {
  console.log("not connected to mongodb");
});

app.listen(port, () => {
  console.log("server is running on port" + " " + port);
});
