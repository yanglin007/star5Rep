import React, { useState } from 'react'
import { Input, Form, Button, Select } from "antd"
import { filterOption } from '../../../constant/common';

export default function ReportDrag() {
    const [data, setData] = useState();
    const [form] = Form.useForm();
    return (
        <Form form={form}>
            <Form.Item label="Report Type:" >
                <Select
                    placeholder="Select Type"
                    filterOption={filterOption}
                    options={[
                        {
                            value: 'Excel',
                            label: 'excel',
                        },
                        {
                            value: 'pdf',
                            label: 'PDF',
                        },
                        {
                            value: 'txt',
                            label: 'TXT',
                        }
                    ]}
                />
            </Form.Item>
        </Form>
    )
}
