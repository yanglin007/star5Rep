import React, { useRef, useState } from 'react'
import { Space, Input, Button } from "antd"
import AddFlowChart from "../components/flowManage/add/index"
import { handleData } from '../api/common.api';
const { TextArea } = Input;

export default function AddFlow(props) {
    const flowRef = useRef()
    const getFlow = async () => {
        console.log("getFlow", flowRef.current)
        const { response } = await handleData({ action: "getFlow", data: "" });
        // if (response) {
        //     setFlow(response.data);
        // }
    }
    const testFlow = async () => {
        const { response } = await handleData({ action: "testFlow", data: "" });
    }
    return (
        <AddFlowChart {...props} ref={flowRef} />
    )
}
