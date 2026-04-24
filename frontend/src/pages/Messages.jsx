import { useState } from "react";
import Navbar from "../components/Navbar";
import { Send } from "lucide-react";

const dummyChats = [
  {
    id: 1,
    name: "Rahul",
    lastMessage: "Is the jacket still available?",
  },
  {
    id: 2,
    name: "Sneha",
    lastMessage: "I can swap my hoodie",
  },
];

const dummyMessages = {
  1: [
    { fromMe: false, text: "Hey, is this available?" },
    { fromMe: true, text: "Yes, it's available!" },
  ],
  2: [
    { fromMe: false, text: "Interested in swapping?" },
    { fromMe: true, text: "Yes sure!" },
  ],
};

function Messages() {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { fromMe: true, text: input };

    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...prev[selectedChat.id], newMsg],
    }));

    setInput("");
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto h-[80vh] flex border rounded-xl overflow-hidden shadow-sm bg-white">

        {/* LEFT SIDEBAR */}
        <div className="w-1/3 border-r overflow-y-auto hidden md:block">
          {dummyChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
                selectedChat.id === chat.id ? "bg-gray-100" : ""
              }`}
            >
              <h3 className="font-semibold">{chat.name}</h3>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>
          ))}
        </div>

        {/* CHAT WINDOW */}
        <div className="flex flex-col flex-1">

          {/* HEADER */}
          <div className="p-4 border-b font-semibold">
            {selectedChat.name}
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages[selectedChat.id]?.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                  msg.fromMe
                    ? "ml-auto bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
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