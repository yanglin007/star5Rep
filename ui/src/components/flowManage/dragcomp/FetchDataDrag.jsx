import React, { useState,forwardRef,useImperativeHandle, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Form, Space, Steps, Input, Button, message, Upload, Select, Radio } from 'antd';
import { filterOption, getFileConfig } from '../../../constant/common';
import FormItem from 'antd/es/form/FormItem';
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
                <FormItem label="DB Url:">
                    <Input placeholder="DB url" />
                </FormItem>
                    <FormItem label="User Name:" name="userName">
                        <Input placeholder="user name" />
                    </FormItem>
                    <FormItem label="Password:" name="password">
                        <Input placeholder="password" />
                    </FormItem>
                <div className='form-title'>
                    Step 2: Select Data Mapping
                    <div style={{ color: "red", fontSize: "10px", paddingTop: "4px" }}>tips: If you not choose,just fetch all data</div>
                </div>
                <Form.Item label="Mapping Rule:" >
                    <Select style={{ width: '100%' }}
                        name="mappingRule"
                        placeholder="Select a rule"
                        options={props.rules}
                    />
                </Form.Item>
            </Form >
        </ >
    )
})
