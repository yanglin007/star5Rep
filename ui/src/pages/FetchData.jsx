import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Form, Space, Steps, Input, Button, message, Upload, Select } from 'antd';
import { filterOption, getFileConfig } from '../constant/common';
const { Search } = Input;

export default function FetchData() {
    const [data, setData] = useState();
    const [form] = Form.useForm();

    const onSuccess = () => { }
    const getData = () => {
        const FromData = form.getFieldsValue();
    }
    return (
        <>
            <Form layout="inline" form={form}>
                <div className='form-title'>Step 1: Select Mapping</div><br />
                <div style={{ width: '20px' }}></div>

                <Form.Item label="Mapping Rule:" style={{ width: '400px' }}>
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

                <Form.Item label="Mapping Table:" style={{ width: '400px' }}>
                    <Select style={{ width: '100%' }}
                        placeholder="Select a table"
                        filterOption={filterOption}
                        options={[
                            {
                                value: 'Trade',
                                label: 'Trade',
                            },
                            {
                                value: 'Order',
                                label: 'Order',
                            },
                        ]}
                    />
                </Form.Item>
                <br /><br />
                <div className='form-title'>Step 2: Fetch Data</div><br />
                <div style={{ width: '20px' }}></div>
                <Form.Item label=" Way 1:" style={{ width: '400px' }}>
                    <Space.Compact block>
                        <Select style={{ width: '100%' }}
                            placeholder="Select data source"
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'System1',
                                    label: 'System1',
                                }
                            ]}
                        />
                        <Button type="primary" onClick={getData}>Fetch</Button>
                    </Space.Compact>
                </Form.Item>
            </Form >
            <span style={{ fontSize: "14px", marginTop: "10px", paddingLeft: "20px", paddingRight: "10px", display: "inline-block" }}>
                Way 2:
            </span>
            <Upload {...getFileConfig({ action: "request", onSuccess, data })}>
                <Button icon={<UploadOutlined />} onClick={() => setData(form.getFieldsValue())}>Upload File</Button>
            </Upload>
        </ >
    )
}
