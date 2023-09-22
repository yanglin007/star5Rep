import React, { useEffect, useState, useRef } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Input, Button, Popconfirm, Tooltip, Modal, Upload } from 'antd';
import MyTable from '../components/MyTable';
import { getFileConfig } from '../constant/common';
import { getList, handleData } from '../api/common.api';
const { Search } = Input;
const data1 = [{ id: 1, source: "1-1", dest: "1", handle: "handle func1" }, { id: 1, source: "1-2", dest: "2", handle: "handle func2" }, { id: 1, source: "1-3", dest: "3", handle: "handle func3" }]
export default function Config() {
    const [filter, setFilter] = useState();

    const onSuccess = () => {
        console.log("after upload success")
        getData()
    }
    return (
        <>

            <Upload {...getFileConfig({ action: "request", onSuccess })}>
                <Button icon={<UploadOutlined />}>Upload New Handle Function</Button>
            </Upload>

        </>
    )
}
