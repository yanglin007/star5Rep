import React, { useState ,useImperativeHandle,forwardRef, useEffect} from 'react'
import { Input, Form, Button } from "antd"
import { handleData } from '../../../api/common.api';
const { TextArea } = Input;


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
    const test=async ()=>{
        const {response}=await handleData({action:"generateRules",data:getData()});
        if(response){
            setData(response.data)
        }
    }
    return (
        <Form form={form}>
            <Form.Item label="Describe:" name="prompt" >
                <TextArea
                    placeholder="please decribe your mapping rules"
                    autoSize={{
                        minRows: 2,
                        maxRows: 6,
                      }}
                />
            </Form.Item>
            <div>{data}</div>
            <br/><br/>
            <Form.Item style={{ textAlign: "right" }}>
                <Button type="primary" onClick={test}>
                  Test
                </Button>
            </Form.Item>
        </Form>
    )
})
