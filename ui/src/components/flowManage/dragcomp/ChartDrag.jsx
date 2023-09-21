import React, { useState } from 'react'
import { Input, Form, Button, Select } from "antd"
import { filterOption } from '../../../constant/common';

export default function ChartDrag() {
    const [data, setData] = useState();
    const [form] = Form.useForm();
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
}
