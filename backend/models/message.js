const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
});

const Message = mongoose.model("Message", messageSchema);
