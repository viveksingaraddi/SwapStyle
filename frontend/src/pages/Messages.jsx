import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { Send, CheckCheck } from "lucide-react";
import axios from "axios";
import { socket } from "../socket";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");
  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ MARK MESSAGES AS READ
  const markAsRead = async (chatId) => {
    try {
      await axios.put(`http://localhost:8000/api/messages/read/${chatId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      socket.emit("messageRead", { conversationId: chatId, readerId: currentUserId });
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  // ✅ 1. FETCH CONVERSATIONS
  useEffect(() => {
    if (!token) return;

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

        localStorage.setItem("chats", JSON.stringify(res.data));

      } catch (err) {
        console.error(err);

        const cached = localStorage.getItem("chats");
        if (cached) {
          setConversations(JSON.parse(cached));
        }
      }
    };

    fetchConversations();
  }, [token]);

  // ✅ FETCH MESSAGES
  useEffect(() => {
    if (!selectedChat || !token) return;

    socket.emit("joinConversation", selectedChat._id);
    markAsRead(selectedChat._id);

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

  }, [selectedChat, token]);

  // ✅ SOCKET LISTENER (SAFE CLEANUP)
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (selectedChat?._id === msg.conversationId) {
        setMessages((prev) => [...prev, msg]);
        markAsRead(msg.conversationId);
      }
    });

    socket.on("userReadMessages", (data) => {
      if (selectedChat?._id === data.conversationId) {
        setMessages((prev) => prev.map(m => ({ ...m, isRead: true })));
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userReadMessages");
    };
  }, [selectedChat]);

  // ✅ SEND MESSAGE
  const handleSend = async () => {
    if (!input.trim() || !selectedChat) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/messages",
        {
          conversationId: selectedChat._id,
          text: input,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages((prev) => [...prev, res.data]);

      socket.emit("sendMessage", res.data);

      setInput("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-20 bg-[hsl(40deg_25%_94%)] min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto h-[85vh] flex border rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* LEFT SIDEBAR - WhatsApp Style */}
        <div className="w-1/3 border-r overflow-y-auto hidden md:block bg-white">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          </div>
          {conversations.map((chat) => {
              const otherUser = chat.members?.find(m => m._id !== currentUserId);
              const isSelected = selectedChat?._id === chat._id;
              return (
                <div
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 cursor-pointer border-b flex items-center gap-3 transition-all duration-200 ${
                        isSelected ? "bg-green-50 border-l-4 border-l-green-500" : "hover:bg-gray-50"
                    }`}
                >
                    <div className="w-12 h-12 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-green-700 font-bold text-lg shadow-sm">
                        {otherUser?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-gray-900 truncate">
                                {otherUser?.name || "User"}
                            </h3>
                            <span className="text-[10px] text-gray-400">12:45 PM</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                            Active swap conversation...
                        </p>
                    </div>
                </div>
              );
          })}
        </div>

        {/* CHAT WINDOW - Telegram Style */}
        <div className="flex flex-col flex-1 bg-[#e5ddd5] relative">
          
          {/* FASHION THEMED BACKGROUND OVERLAY */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')" }}></div>

          {/* HEADER */}
          <div className="p-4 border-b font-bold text-gray-800 bg-white/90 backdrop-blur-sm flex items-center gap-4 z-10 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {selectedChat?.members?.find(m => m._id !== currentUserId)?.name?.charAt(0) || "U"}
            </div>
            <div>
                <p className="leading-tight">{selectedChat ? selectedChat.members?.find(m => m._id !== currentUserId)?.name : "Select a chat"}</p>
                <p className="text-[10px] text-green-600 font-medium">online</p>
            </div>
          </div>

          {/* MESSAGES AREA */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 custom-scrollbar">
            {messages.map((msg, index) => {
              const isMine = msg.sender === currentUserId;

              return (
                <div
                  key={index}
                  className={`flex ${isMine ? "justify-end" : "justify-start"} animate-slide-up`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-md relative ${
                      isMine
                        ? "bg-[hsl(142_70%_45%)] text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                    <div className="flex items-center justify-end gap-1 mt-1">
                        <span className={`text-[9px] ${isMine ? "text-green-100" : "text-gray-400"}`}>
                            12:46 PM
                        </span>
                        {isMine && (
                            <CheckCheck size={12} className={msg.isRead ? "text-blue-400" : "text-gray-300"} />
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="p-4 bg-white/90 backdrop-blur-sm flex items-center gap-3 z-10 border-t">
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full h-12 px-5 pr-12 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                    }}
                />
            </div>

            <button
              onClick={handleSend}
              className="bg-green-600 p-3 rounded-full text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;