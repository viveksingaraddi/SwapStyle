import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Send } from "lucide-react";
import axios from "axios";
import { socket } from "../socket";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");
  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  // ✅ 1. FETCH CONVERSATIONS
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/conversations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setConversations(res.data);
        if (res.data.length > 0) {
          setSelectedChat(res.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchConversations();
  }, []);

  // ✅ 2. FETCH MESSAGES + JOIN SOCKET ROOM
  useEffect(() => {
    if (!selectedChat) return;

    socket.emit("joinConversation", selectedChat._id);

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/messages/${selectedChat._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // ✅ 3. RECEIVE REAL-TIME MESSAGE
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // ✅ 4. SEND MESSAGE
  const handleSend = async () => {
    if (!input.trim() || !selectedChat) return;

    const messageData = {
      conversationId: selectedChat._id,
      text: input,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/messages",
        messageData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // add locally
      setMessages((prev) => [...prev, res.data]);

      // send via socket
      socket.emit("sendMessage", res.data);

      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto h-[80vh] flex border rounded-xl overflow-hidden shadow-sm bg-white">

        {/* LEFT SIDEBAR */}
        <div className="w-1/3 border-r overflow-y-auto hidden md:block">
          {conversations.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
                selectedChat?._id === chat._id ? "bg-gray-100" : ""
              }`}
            >
              <h3 className="font-semibold">
                {chat.members?.find((m) => m._id !== chat.currentUser)?.name ||
                  "User"}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage || "Start chatting..."}
              </p>
            </div>
          ))}
        </div>

        {/* CHAT WINDOW */}
        <div className="flex flex-col flex-1">

          {/* HEADER */}
          <div className="p-4 border-b font-semibold">
            {selectedChat ? "Chat" : "Select a chat"}
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => {
  const isMine = msg.sender === currentUserId;

  return (
    <div
      key={index}
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow ${
          isMine
            ? "bg-green-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
})}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 h-10 px-4 rounded-full bg-gray-100 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={handleSend}
              className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;