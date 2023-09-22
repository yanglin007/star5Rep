import React, { useState,useImperativeHandle,forwardRef, useEffect } from 'react'
import { Input, Form, Button, Select } from "antd"
import { filterOption } from '../../../constant/common';

export default forwardRef(function ChartDrag(props,ref) {
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
            <Form.Item label="Chart Type:" >
                <Select
                    placeholder="Select Type"
                    filterOption={filterOption}
                    options={[
                        {
                            value: 'line',
                            label: 'Line',
                        },
                        {
                            value: 'bar',
                            label: 'Bar',
                        },
                        {
                            value: 'pie',
                            label: 'Pie',
                        }
                    ]}
                />
            </Form.Item>
        </Form>
    )
})
