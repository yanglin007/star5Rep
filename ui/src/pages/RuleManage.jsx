import React, { useEffect, useState, useRef } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Input, Button, Popconfirm, Tooltip, Modal, Upload } from 'antd';
import MyTable from '../components/MyTable';
import { getFileConfig } from '../constant/common';
import { getList, handleData } from '../api/common.api';
const { Search } = Input;
const data1 = [{ id: 1, source: "1-1", dest: "1", handle: "handle func1" }, { id: 1, source: "1-2", dest: "2", handle: "handle func2" }, { id: 1, source: "1-3", dest: "3", handle: "handle func3" }]
export default function RuleManage() {
    const [filter, setFilter] = useState();
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [type, setType] = useState();
    const modalRef = useRef();
    const columns = [
        {
            title: 'Rule Name',
            dataIndex: 'rule_name',
            render: (text) => <a onClick={() => openModal("show")}>{text}</a>,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.rule_name.localeCompare(b.rule_name),
        },
        {
            title: 'Description',
            dataIndex: 'rule_description',
            width: 400,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.rule_description.localeCompare(b.rule_description),
            ellipsis: {
                showTitle: false,
            },
            render: (address) => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            ),
        },

        {
            title: 'Tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags && tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'default') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, row) => (<a onClick={() => openModal("edit",row)}> Edit</ a>),
        },
    ];
    useEffect(() => {
        getData();

    }, [])
    const getData = async () => {
        setLoading(true);
        const { response } = await getList({ action: "getRule", filter });
        if (response) {
            setLoading(false);
            setData(response.data);
        }
        // setTimeout(() => {
        //     setLoading(false);
        //     let data = []
        //     for (let i = 0; i < 100; i++) {
        //         data.push({
        //             key: i,
        //             name: `order rule ${i}`,
        //             describ: `London, Park Lane no. ${i} 1111111111111111`,
        //             tags: ['default']
        //         });
        //     }
        //     // tags: ['user config'],
        //     setData(data);
        // }, 100)
    }
    const onSearch = (e) => {
        setFilter(e.target.value);
        getData()
    }

    const handleOk = async () => {
        //getModal data
        let data = modalRef.current.data;
        setConfirmLoading(true);
        // request  
        const { response } = await handleData({ action: "request", data });
        if (response) {
            setOpen(false);
            setConfirmLoading(false);
            getData();
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const openModal = async (type,row) => {
        setType(type);
        setOpen(true);
        if( type !== "add"){
            const { response } = await getList({ action: "getRulesMapping", filter:{rule_id:row.rule_id} });
            setModalData(response.data);
        } else {
            setModalData([]);
        }

    }
    const onSuccess = () => {
        console.log("after upload success")
        getData()
    }
    return (
        <>
            <div className='filter'>
                <Search placeholder="input rule name" onSearch={onSearch} enterButton />
                <Upload {...getFileConfig({ action: "/api/addRule", onSuccess,data:{rule_name:"db_rule"}})}>
                    <Button icon={<UploadOutlined />}>Upload Rule</Button>
                </Upload>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal("add")}>
                    Add
                </Button>
            </div>
            <div className='config-table display'>

                <Table columns={columns} dataSource={data} loading={loading}
                    scroll={{ y: 280 }} rowkey='key' />

            </div>
            {open && <Modal
                title="Mapping Rule"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={1000}
            >
                <MyTable sourceData={modalData} type={type} ref={modalRef} />
            </Modal >}
        </>
    )
}
