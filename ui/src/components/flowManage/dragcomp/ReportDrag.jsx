import React, { useState ,useImperativeHandle,forwardRef, useEffect} from 'react'
import { Input, Form, Button } from "antd"

export default forwardRef(function ReportDrag(props,ref) {
    useImperativeHandle(ref, () => ({
        getData
    }));
    const [data, setData] = useState();
    const [form] = Form.useForm();
    useEffect(()=>{
        form.setFieldsValue({...props.config });
    },[props.config])
    const getData = () => {
        return form.getFieldsValue();
    }
    return (
        <Form form={form}>
            <Form.Item label=" File Name:" name="file_name" >
                <Input
                    placeholder=""
                />
            </Form.Item>
            <Form.Item label="Describe:" name="desc" >
                <Input
                    placeholder=""
                />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">
                    Save as lib
                </Button>
            </Form.Item>
        </Form>
    )
})
