"use client";
import { useState, useEffect, useRef } from "react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Message from "@/components/ui/Message";
import axios from "axios";
import { createClient } from "@/utils/supabase/client";
import { useAuthInfo } from "@/context/AuthInfo";

interface MessageData {
  sender: "bot" | "user";
  text: string;
}

const Chat: React.FC = () => {
  const { user, role, setRole } = useAuthInfo();

  const [messages, setMessages] = useState<MessageData[]>([
    {
      sender: "bot",
      text: "Hello, welcome to FirstCheque bot. How can I help you today? 🤖",
    },
  ]);
  const [input, setInput] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const formatMessageToHTML = (message: string) => {
    return message
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/(?:\r\n|\r|\n)/g, "<br>");
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!role && user) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("user")
          .select("role")
          .eq("userid", user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
        } else if (data) {
          setRole(data.role);
        }
      }
    };

    fetchUserRole();
  }, [user, role, setRole]);

  useEffect(() => {
    console.log("role", role);
  }, [role]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    setInput("");

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      // Updated the API endpoint to your Render backend
      const response = await axios.post(
        "https://firstcheque-chatbot.onrender.com/chat",
        { input_text: input },
        { signal }
      );

      const formattedResponse = formatMessageToHTML(response.data.response);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: formattedResponse },
      ]);
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") return;
      console.error("Error fetching chatbot response:", error);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    }

    return () => controller.abort();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">You are not logged in.</h1>
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
          text="Login to continue"
          className="mt-4"
        />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-screen text-black bg-white">
      <main className="flex-grow p-6 overflow-y-auto w-[60%] mx-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              isUser={message.sender === "user"}
            />
          ))}
          <div ref={bottomRef}></div>
        </div>
      </main>

      <footer className="bg-white p-4 flex items-center border-t border-gray-300">
        <div className="flex w-full max-w-3xl mx-auto">
          <InputField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="mr-2 flex-grow"
          />
          <Button onClick={handleSendMessage} text="Send" />
        </div>
      </footer>

      <Button
        onClick={() => {
          window.location.href = "/chatbot";
        }}
        text="Restart Chatbot"
        className="absolute bottom-4 left-4 bg-green-900"
      />

      <Button
        onClick={() => {
          window.location.href = "/";
        }}
        text="Exit Chatbot"
        className="absolute bottom-4 right-4 bg-red-900"
      />
    </div>
  );
};

export default Chat;
