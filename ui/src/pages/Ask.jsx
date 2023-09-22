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
import { handleData } from '../api/common.api';


const Ask = () => {
  const [messages, setMessages] = useState([
    {
      message: `Hello, I'm data analyze assistant`,
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);
    const { response } = await handleData({ action: "chatQa", data: {prompt:message} });
    if (response) {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, {message:response.data, sender: "ChatGPT",}]);
    }
 
  };

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
