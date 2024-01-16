import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext";
import { toast } from "react-toastify";

const Chat = () => {
  const { user } = useUserContext();

  const [userChats, setUserChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/chat/user/${user?._id}`
        );
        const chatsData = await response.json();
        setUserChats(chatsData);

        const otherUsersData = [];
        for (const chat of chatsData) {
          const otherUserId = chat.participants.find((id) => id !== user._id);
          const response = await fetch(
            `http://localhost:8080/profile/${otherUserId}`
          );
          const otherUserData = await response.json();
          otherUsersData.push({ userId: otherUserId, data: otherUserData });
        }
        setOtherUsers(otherUsersData);

        if (chatsData.length > 0) {
          setCurrentChat(chatsData[0]);
          setMessages(chatsData[0].messages);
        }
      } catch (error) {
        console.error("Error fetching chat information:", error);
      }
    };

    if (user) {
      fetchUserChats();
    }
  }, [user]);

  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
    setMessages(chat.messages);
  };

  const handleSendMessage = async () => {
    try {
      if (!newMessage.trim()) {
        toast("Message cannot be empty");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/chat/${currentChat?._id}/send-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: user?._id,
            content: newMessage,
          }),
        }
      );

      const newMessageData = await response.json();
      setMessages([...messages, newMessageData]);
      setNewMessage("");

      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message");
    }
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Chats</h2>
      {userChats.length > 0 ? (
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/4 mb-4">
            <span className="font-bold">Select a Chat:</span>
            <div className="flex flex-col mt-2">
              {userChats.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-2 border rounded mr-2 ${
                    currentChat?._id === chat._id ? "bg-red-400 text-white" : ""
                  }`}
                >
                  {chat.participants[0] === user._id
                    ? otherUsers.find(
                        (otherUser) => otherUser.userId === chat.participants[1]
                      )?.data?.username || "Unknown User"
                    : chat.participants[1] === user._id
                    ? otherUsers.find(
                        (otherUser) => otherUser.userId === chat.participants[0]
                      )?.data?.username || "Unknown User"
                    : ""}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-grow ml-4">
            <div className="flex flex-col-reverse mb-4 h-96 overflow-y-auto">
              <ul>
                {messages.map((message, index) => (
                  <li key={index} className="mb-2">
                    <span
                      className={`font-bold ${
                        message.sender === user._id
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {message.sender === user._id
                        ? "You"
                        : otherUsers.find(
                            (otherUser) => otherUser.userId === message.sender
                          )?.data?.username || "Unknown User"}
                      :
                    </span>{" "}
                    {message.content}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow mb-2 sm:mr-2 p-2 border rounded"
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-400 text-white px-4 py-2 rounded"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No Chats Yet!!</div>
      )}
    </div>
  );
};

export default Chat;
