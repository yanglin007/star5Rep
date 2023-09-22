import React, { useState,forwardRef,useImperativeHandle, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Form, Space, Steps, Input, Button, message, Upload, Select, Radio } from 'antd';
import { filterOption, getFileConfig } from '../../../constant/common';
const { Search } = Input;

export default forwardRef(function FetchData(props,ref) {
    useImperativeHandle(ref, () => ({
        getData
    }));
    const [data, setData] = useState();
    const [form] = Form.useForm();
    useEffect(()=>{
        form.resetFields();
        form.setFieldsValue({...props.config });
    },[props.config])
    const onSuccess = () => { }
    const getData = () => {
        return form.getFieldsValue();
    }

    return (
        <>
            <Form form={form}>
                <div className='form-title'>Step 1: Select Data Source</div><br />
               <FormItem label="API:" name="api">
                    <Input placeholder="please input api url" />
                </FormItem> 
                <div className='form-title'>
                    Step 2: Select Data Mapping
                    <div style={{ color: "red", fontSize: "10px", paddingTop: "4px" }}>tips: If you not choose,just fetch all data</div>
                </div>
                <Form.Item label="Mapping Rule:" >
                    <Select style={{ width: '100%' }}
                        name="mappingRule"
                        placeholder="Select a rule"
                        options={[
                            {
                                value: 'rule1',
                                label: 'rule1',
                            },
                            {
                                value: 'rule2',
                                label: 'rule2',
                            },
                        ]}
                    />
                </Form.Item>
            </Form >
        </ >
    )
})
