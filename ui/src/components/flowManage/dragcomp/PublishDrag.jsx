import React, { useState } from 'react'
import { Input, Form, Button } from "antd"

export default function PublishDrag() {
    const [data, setData] = useState();
    const [form] = Form.useForm();

    return (
        <Form form={form}>
            <Form.Item label="Publish API:" >
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
}
