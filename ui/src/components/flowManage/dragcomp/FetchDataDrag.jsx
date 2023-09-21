import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Form, Space, Steps, Input, Button, message, Upload, Select, Radio } from 'antd';
import { filterOption, getFileConfig } from '../../../constant/common';
import FormItem from 'antd/es/form/FormItem';
const { Search } = Input;

export default function FetchData() {
    const [data, setData] = useState();
    const [form] = Form.useForm();
    const [type, setType] = useState(1);
    const onSuccess = () => { }
    const getData = () => {
        const FromData = form.getFieldsValue();
    }

    const onChange = (e) => {
        console.log(e.target.value)
        setType(e.target.value)
    }
    return (
        <>
            <Form form={form}>
                <div className='form-title'>Step 1: Select Data Source</div><br />
                <FormItem label="Source Type:">
                    <Radio.Group onChange={onChange} value={type}>
                        <Radio value={1}>API</Radio>
                        <Radio value={2}>DB</Radio>
                        <Radio value={3}>Local</Radio>
                    </Radio.Group>
                </FormItem>
                {type == 1 ? <FormItem label="API:">
                    <Input placeholder="please input api url" />
                </FormItem> : type == 2 ? <><FormItem label="DB Url:">
                    <Input placeholder="DB url" />
                </FormItem>
                    <FormItem label="User Name:">
                        <Input placeholder="user name" />
                    </FormItem>
                    <FormItem label="Password:">
                        <Input placeholder="password" />
                    </FormItem></> : <FormItem label="">
                    <Upload {...getFileConfig({ action: "request", onSuccess, data })}>
                        <Button icon={<UploadOutlined />} onClick={() => setData(form.getFieldsValue())}>Upload Data</Button>
                    </Upload>
                </FormItem>}
                <div className='form-title'>
                    Step 2: Select Data Mapping
                    <div style={{ color: "red", fontSize: "10px", paddingTop: "4px" }}>tips: If you not choose,just fetch all data</div>
                </div>
                <Form.Item label="Mapping Rule:" >
                    <Select style={{ width: '100%' }}
                        placeholder="Select a rule"
                        options={[
                            {
                                value: 'jack',
                                label: 'rule1',
                            },
                            {
                                value: 'lucy',
                                label: 'rule2',
                            },
                        ]}
                    />
                </Form.Item>
            </Form >
        </ >
    )
}
