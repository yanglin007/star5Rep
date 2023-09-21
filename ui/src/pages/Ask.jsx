import React, { useState, useEffect } from 'react'
import { Space, Table, Tag, Input, Button, Popconfirm, Tooltip } from 'antd';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar
} from '@chatscope/chat-ui-kit-react';
import assitLogo from "../asset/assitant.jpg"
import catLogo from "../asset/cat.jpg"

const API_KEY = "YOUR_API_KEY_HERE"

const Ask = () => {
  const [messages, setMessages] = useState([
    {
      message: `Hello, I'm data analyze assistant,
you can ask me anything about data analyze, also for drawig diagrams`,
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <MainContainer>
      <ChatContainer>
        <MessageList
          scrollBehavior="smooth"
          typingIndicator={isTyping ? <TypingIndicator content="typing" /> : null}
        >
          {messages.map((message, i) => {
            return <Message key={i} model={message} > <Avatar src={i % 2 === 0 ? assitLogo : catLogo} name="" /></Message>
          })}
        </MessageList>
        <MessageInput placeholder="you can ask me here" onSend={handleSendRequest} attachButton={false} />
      </ChatContainer>
    </MainContainer>
  )
}
export default Ask;
