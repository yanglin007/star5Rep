import React, { useState, useRef } from 'react'
import { Space, Table, Tag, Input, Button, message, Upload, Select } from 'antd';
import { filterOption } from '../../constant/common';
const { Search } = Input;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
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
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
export default function DataList() {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const onSearch = () => { }


    const onSuccess = () => {
        console.log("after upload success")
    }
    return (
        <>
            Table:  <Select style={{ width: '100%' }}
                placeholder="Select a table"
                filterOption={filterOption}
                options={[
                    {
                        value: 'Trade',
                        label: 'Trade',
                    },
                    {
                        value: 'Order',
                        label: 'Order',
                    },
                ]}
            />
            <div className='filter'>
                <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
            <Table columns={columns} dataSource={data} />

        </>
    )
}
