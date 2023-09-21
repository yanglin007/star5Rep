import Header from "../components/Header";
import { chatCompletion } from "../api/chat.api";
import TypeWriter from "typewriter-effect";
// import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import { FloatButton, Drawer } from 'antd'
import { MessageOutlined } from '@ant-design/icons';
import Ask from "./Ask";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navigation />
      <FloatButton icon={<MessageOutlined />} type="primary" style={{ right: 24, bottom: 100 }} onClick={() => setOpen(!open)} />
      <Drawer title="Data Analyze" placement="right" onClose={() => setOpen(false)} open={open}>
        <Ask />
      </Drawer>
    </>
  );
};

export default HomePage;