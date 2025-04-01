"use client";
import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/ButtonInput";
import Message from "@/components/Message";

interface MessageData {
  sender: "bot" | "user";
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([
    { sender: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "This is a response from the bot!" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen w-full text-black bg-white">
      <main className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              isUser={message.sender === "user"}
            />
          ))}
        </div>
      </main>

      <footer className="bg-white p-4 flex items-center border-t border-gray-300">
        <div className="flex w-full max-w-xl mx-auto">
          <InputField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="mr-2 flex-grow"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
