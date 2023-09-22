import React, { useState ,useImperativeHandle,forwardRef, useEffect} from 'react'
import { Input, Form, Button } from "antd"

export default forwardRef(function PublishDrag(props,ref) {
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
            <Form.Item label="Publish File Name:" >
                <Input
                    placeholder=""
                    value={data}
                />
            </Form.Item>
            {/* <Form.Item style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item> */}
        </Form>
    )
})
