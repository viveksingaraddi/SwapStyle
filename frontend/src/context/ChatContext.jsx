import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeChat, setActiveChat] = useState(null);

  const createChat = (user, product) => {
    const chatId = Date.now();

    const newChat = {
      id: chatId,
      name: user,
      lastMessage: `Swap request for ${product}`,
    };

    setChats((prev) => [...prev, newChat]);

    setMessages((prev) => ({
      ...prev,
      [chatId]: [
        {
          fromMe: true,
          text: `Hi! I want to swap for your ${product}`,
        },
      ],
    }));

    setActiveChat(newChat);

    return chatId;
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        setMessages,
        activeChat,
        setActiveChat,
        createChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);