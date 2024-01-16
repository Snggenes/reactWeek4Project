const express = require("express");
const router = express.Router();
const userModel = require("../db/usermodel");
const chatModel = require("../db/chatmodel");

router.post("/:chatId/send-message", async (req, res) => {
  const chatId = req.params.chatId;
  const { sender, content } = req.body;

  try {
    const chat = await chatModel.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const newMessage = {
      sender,
      content,
      timestamp: Date.now(),
    };

    chat.messages.push(newMessage);
    await chat.save();

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const userChats = await chatModel.find({
      participants: userId,
    });

    if (userChats.length === 0) {
      return res.json({ message: "No chats found for the user" });
    }
    res.json(userChats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/create-chat", async (req, res) => {
  const { participant1, participant2 } = req.body;

  try {
    const existingChat = await chatModel.findOne({
      participants: {
        $all: [participant1, participant2],
      },
    });

    if (existingChat) {
      return res.json(existingChat);
    }

    const newChat = await chatModel.create({
      participants: [participant1, participant2],
      messages: [],
    });

    res.json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
