import React, { useRef, useState } from 'react'
import { Space, Input, Button, Modal, Form } from "antd"
import { handleData } from '../../../api/common.api';
const { TextArea } = Input;

export default function FlowBtn(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getFlow = async () => {
        const { response } = await handleData({ action: "getFlow", data: "" });
        if (response) {
            props.setFlow(response.data);
        }
    }
    const testFlow = async () => {
        const { response } = await handleData({ action: "testFlow", data: "" });
    }
    const saveFlow = async () => {
        const { response } = await handleData({ action: "saveFlow", data: "" });
    }
    return (
        <div className='filter'>
            <Space>
                <TextArea rows={4}
                    placeholder="Please describe your work flow"
                    autoSize={{
                        minRows: 2,
                        maxRows: 6,
                    }}
                    style={{ width: '400px' }}
                />
                <Button type="primary" onClick={getFlow}>Create workflow</Button>
                <Button onClick={testFlow}>Test Workflow</Button>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Save Workflow</Button>
            </Space>
            <Modal title="Save Workflow" open={isModalOpen} onOk={saveFlow} onCancel={() => setIsModalOpen(false)}>
                <Form >
                    <Form.Item label="Name:" >
                        <Input placeholder="workflow name" />
                    </Form.Item>
                    <Form.Item label="Describe:" >
                        <TextArea
                            placeholder="describe..."
                            autoSize={{
                                minRows: 2,
                                maxRows: 6,
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
