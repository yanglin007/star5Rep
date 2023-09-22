import React, { useRef, useState } from 'react'
import { Space, Input, Button, Modal, Form, Select } from "antd"
import { handleData,getList } from '../../../api/common.api';
import { createFlowData, toSaveFlow } from '../../../utils';
const { TextArea } = Input;

export default function FlowBtn(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [value,setValue]=useState()
    const getFlow = async () => {

        // console.log("create",props,createFlowData())

        const { response } = await handleData({ action: "llm", data:{prompt:value} });
        if (response) {
           const data=response.data.split(',');
           props.setFlow(createFlowData(props,data));
        }
    }
    const testFlow = async () => {
        let data=toSaveFlow(props);
        const { response } = await handleData({ action: "runWf", data });
    }
    const saveFlow = async () => {
        let data=toSaveFlow(props);
        data={...data,...form.getFieldsValue()};
        const { response } = await handleData({ action: "saveWf",data});
        if(response){
            console.log(response);
        }
    }
    const clearWorkflow=()=>{
        props.setFlow({nodes:[],edges:[]});
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
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                />
                <Button type="primary" onClick={getFlow}>Create workflow</Button>
                <Button onClick={testFlow}>Test Workflow</Button>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Save Workflow</Button>
                <Button onClick={clearWorkflow}>Clear Workflow</Button>
            </Space>
            <Modal title="Save Workflow" open={isModalOpen} onOk={saveFlow} onCancel={() => setIsModalOpen(false)}>
                <Form form={form}>
                    <Form.Item label="Name:" name="wf_name">
                        <Input placeholder="workflow name" />
                    </Form.Item>
                    <Form.Item label="Describe:" name="wf_desc">
                        <TextArea 
                            placeholder="describe..."
                            autoSize={{
                                minRows: 2,
                                maxRows: 6,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Triggle Time:" name="schedule">
                        <Select
                            placeholder=""
                            options={[
                                {
                                    value: '6:00',
                                    label: '6:00',
                                },
                                {
                                    value: '12:00',
                                    label: '12:00',
                                },
                                {
                                    value: '24:00',
                                    label: '24:00',
                                }
                            ]}
                        />
                        
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
