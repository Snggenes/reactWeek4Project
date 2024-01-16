const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: { type: String, required: true },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
